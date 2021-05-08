import React from "react";
import { useContext, useEffect } from "react";
import './styles/Home.css'
import Table from "./components/Table";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import { Row, Col, notification } from "antd";
import { ThreadsContext } from "./store/threads";
import { AppContext } from "./store/app";
import { TextileClient, listDBs, listCollections, getInstancesByQuery } from "./textile";
import { ThreadID, Query, Client } from "@textile/hub";
import { getLocalStorage } from "./helpers";
import { localStorageKeys } from "./constants";

export default function Main() {
  const [threadsCtxState, threadsCtxActions] = useContext(ThreadsContext);
  const [appCtxState, appCtxActions] = useContext(AppContext);

  // Used for building the tree data from collections and threads.
  async function buildTree(): Promise<void> {
    appCtxActions.setIsTableLoading(true);
    appCtxActions.setIsTreeLoading(true);
    let threadsCounter: number = 0;
    const client: Client = await new TextileClient().init({
      key: appCtxState.hubKey,
      secret: appCtxState.hubSecret
    });
    if (!client) {
      return;
    }
    const dbs = await listDBs(client);
    if (dbs?.length > 0) {
      dbs.forEach(async (thread, threadIndex) => {
        threadsCounter++;
        thread.key = `0-0-${threadIndex}`;
        thread.title = thread.name;
        const collections = await listCollections(client, ThreadID.fromString(thread.id))
        if (collections?.length > 0) {
          let collectionsCounter = 0;
          thread.children = [];
          collections.forEach((collection, collectionIndex) => {
            collectionsCounter++;
            collection.key = `0-0-${threadIndex}-${collectionIndex}`;
            collection.title = collection.name;
            collection.onClick = () => {
              fetchInstances(thread.id, collection.name);
              threadsCtxActions.setSelectedCollection(collection);
              threadsCtxActions.setSelectedThread(thread);
            }
            thread.children.push(collection);
            if (threadsCounter === dbs.length && collectionsCounter === collections.length) {
              const treeData = [{ title: "Threads", key: '0-0', children: dbs }];
              threadsCtxActions.setTreeData(treeData);
              appCtxActions.setIsTreeLoading(false);
              appCtxActions.setIsTableLoading(false);
            }
          });
        } else {
          console.error("Error fetching collections.");
        }
      });
    } else {
      console.error("Error fetching threads.");
    }
  };

  // Used to fetch instances from a collection.
  async function fetchInstances(threadID: string, collectionName: string): Promise<void> {
    appCtxActions.setIsTableLoading(true);
    const client: Client = await new TextileClient().init({
      key: appCtxState.hubKey,
      secret: appCtxState.hubSecret
    });
    if (!client) {
      return;
    }
    const query: Query = new Query().orderByIDDesc();
    const instances = await getInstancesByQuery(client, ThreadID.fromString(threadID), collectionName, query);
    instances.forEach((instance: Record<string, any>, index: number) => {
      instance.key = index;
    });
    threadsCtxActions.setInstances(instances);
    appCtxActions.setIsTableLoading(false);
  };

  // Used to dynamically parse column headers from instances.
  function getColumns(instances: Array<Record<string, any>>): Array<Record<string, any>> {
    let columns: Array<Record<string, any>> = [];
    let columnTypes: Record<string, any> = {};
    instances.forEach((instance: Record<string, any>) => {
      columnTypes = { ...columnTypes, ...Object.keys(instance) };
    });
    Object.values(columnTypes).forEach((type: string, index: number) => {
      columns.push({
        title: type,
        dataIndex: type,
        key: index,
        ellipsis: true,
        sorter: (a, b) => a[type].toString().localeCompare(b[type].toString()),
      });
    })
    return columns;
  };

  // Retrieve localStorage and set to Redux on page load.
  useEffect(() => {
    const localStorage: Record<string, any> = getLocalStorage();
    if (!localStorage[localStorageKeys.HUB_KEY] || !localStorage[localStorageKeys.HUB_SECRET]) {
      notification.warning({ 
        message: `Missing API keys!`,
        description: "Add your Textile Hub API keys in the settings menu.",
        placement: "bottomRight"
      })
    }
    appCtxActions.setHubKey(localStorage[localStorageKeys.HUB_KEY]);
    appCtxActions.setHubSecret(localStorage[localStorageKeys.HUB_SECRET]);
    appCtxActions.setIsDarkMode(localStorage[localStorageKeys.DARK_MODE] === "true");
  }, [window.localStorage]);

  return (
    <>
      <TopBar />
      <Row wrap={false}>
        <Col flex="250px">
          <SideBar treeData={threadsCtxState.treeData} buildTree={buildTree} />
        </Col>
        <Col flex="auto">
          <Table columns={getColumns(threadsCtxState.instances)}
            data={threadsCtxState.instances}
          />
        </Col>
      </Row>
    </>
  );
};
