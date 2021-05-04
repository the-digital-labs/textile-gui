import React from "react";
import { useContext, useEffect } from "react";
import './styles/Home.css'
import Table from "./components/Table";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import { Row, Col } from "antd";
import { ThreadsContext } from "./store/threads";
import { AppContext } from "./store/app";
import { TextileClient, listDBs, listCollections, getInstancesByQuery } from "./textile.ts";
import { ThreadID, Query } from "@textile/hub";

export default function Main() {
  const [threadsCtxState, threadsCtxActions] = useContext(ThreadsContext);
  const [appCtxState, appCtxActions] = useContext(AppContext);

  async function buildTree() {
    appCtxActions.setIsTableLoading(true);
    appCtxActions.setIsTreeLoading(true);
    let threadsCounter = 0;
    const client = await new TextileClient().init();
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

  async function fetchInstances(threadID, collectionName) {
    appCtxActions.setIsTableLoading(true);
    const client = await new TextileClient().init();
    const query = new Query().orderByIDDesc();
    const instances = await getInstancesByQuery(client, ThreadID.fromString(threadID), collectionName, query);
    instances.forEach((instance, index) => {
      instance.key = index;
    });
    threadsCtxActions.setInstances(instances);
    appCtxActions.setIsTableLoading(false);
  };

  function getColumns(instances) {
    let columns = [];
    let columnTypes = {};
    instances.forEach(instance => {
      columnTypes = { ...columnTypes, ...Object.keys(instance) };
    });
    Object.values(columnTypes).forEach((type, index) => {
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

  useEffect(() => {
    appCtxActions.setHubKey(window.localStorage.getItem("HUB_KEY"));
    appCtxActions.setHubSecret(window.localStorage.getItem("HUB_SECRET"));
    appCtxActions.setIsDarkMode(window.localStorage.getItem("DARK_MODE") === "true");
  }, []);

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
