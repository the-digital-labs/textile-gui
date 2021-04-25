import { useContext } from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Table from "../components/Table";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import { Row, Col } from "antd";
import { ThreadsContext } from "../store/threads";
import { AppContext } from "../store/app";

export default function Home() {
  const [threadsCtxState, threadsCtxActions] = useContext(ThreadsContext);
  const [appCtxState, appCtxActions] = useContext(AppContext);

  async function buildTree() {
    appCtxActions.setIsTableLoading(true);
    appCtxActions.setIsTreeLoading(true);
    let threadsCounter = 0;
    const threadsResponse = await fetch("api/threads");
    if (threadsResponse.ok) {
      const threads = await threadsResponse.json();
      threads.forEach(async (thread, threadIndex) => {
        threadsCounter++;
        thread.key = `0-0-${threadIndex}`;
        thread.title = thread.name;
        const collectionsResponse = await fetch(`api/threads/collections/?threadID=${thread.id}`);
        if (collectionsResponse.ok) {
          let collectionsCounter = 0;
          const collections = await collectionsResponse.json();
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
            if (threadsCounter === threads.length && collectionsCounter === collections.length) {
              const treeData = [{ title: "Threads", key: '0-0', children: threads }];
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

  function fetchInstances(threadID, collectionName) {
    appCtxActions.setIsTableLoading(true);
    fetch(`api/threads/instances/?threadID=${threadID}&collectionName=${collectionName}`).then(resp => resp.json().then(json => {
      console.log("instances", json);
      json.forEach((instance, index) => {
        instance.key = index;
      });
      threadsCtxActions.setInstances(json);
      appCtxActions.setIsTableLoading(false);
    }));
  };

  function getColumns(instances) {
    let columns = [];
    let columnTypes = {};
    instances.forEach(instance => {
      columnTypes = { ...columnTypes, ...Object.keys(instance) };
    });
    Object.values(columnTypes).forEach((type: any, index: number) => {
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

  return (
    <>
      <Head>
        <title>textile-gui</title>
      </Head>
      <TopBar />
      <Row>
        <Col flex={"250px"}>
          <SideBar treeData={threadsCtxState.treeData} buildTree={buildTree} />
        </Col>
        <Col flex="min-content">
          <Table columns={getColumns(threadsCtxState.instances)}
            data={threadsCtxState.instances}
          />
        </Col>
      </Row>
    </>
  );
};
