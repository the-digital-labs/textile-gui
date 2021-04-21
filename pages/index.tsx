import { useContext, useEffect } from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Table from "../components/Table";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import { Row, Col } from "antd";
import { ThreadsContext } from "../store/threads";

export default function Home() {
  const [threadsCtxState, threadsCtxActions] = useContext(ThreadsContext);

  console.log(threadsCtxState);

  function fetchThreads() {
    fetch("api/threads").then(resp => resp.json().then(json => {
      console.log(json);
      json.forEach(thread => {
        thread.key = thread.id;
        thread.title = thread.name;
        thread.onClick = () => threadsCtxActions.setSelectedThread(thread);
      });
      const treeData = [{ title: "Threads", key: "threads", disableCheckbox: true, children: json }]
      threadsCtxActions.setTreeData(treeData);
      threadsCtxActions.setThreads(json);
    }));
  };

  function fetchCollections(threadID) {
    fetch(`api/threads/collections/?threadID=${threadID}`).then(resp => resp.json().then(json => {
      console.log(json);
      json.forEach((collection, index) => {
        collection.key = index;
        collection.title = collection.name;
        collection.onClick = () => threadsCtxActions.setSelectedCollection(collection);
      });
      const newTree = mergeTrees(threadsCtxState.threads, threadsCtxState.selectedThread, json);
      threadsCtxActions.setTreeData(newTree);
      threadsCtxActions.setCollections(json);
    }));
  };

  function fetchInstances(threadID, collectionName) {
    fetch(`api/threads/instances/?threadID=${threadID}&collectionName=${collectionName}`).then(resp => resp.json().then(json => {
      console.log(json);
      json.forEach(instance => {
        instance.key = instance.id;
      });
      threadsCtxActions.setInstances(json);
    }));
  };

  function mergeTrees(threads, selectedThread, collections) {
    threads.forEach(thread => {
      if (thread.id === selectedThread.id) {
        console.log("asdjhfbaskjhdfb")
        thread.children = collections;
      }
    })
    return threads;
  }

  function getColumns(instances) {
    let columns = [];
    let columnTypes = {};
    instances.forEach(instance => {
      columnTypes = { ...columnTypes, ...Object.keys(instance) };
    });
    Object.values(columnTypes).forEach(type => {
      columns.push({
        title: type,
        dataIndex: type,
        key: type,
        ellipsis: true
      });
    })
    return columns;
  }

  useEffect(() => {

  }, []);

  return (
    <>
      <Head>
        <title>textile-gui</title>
      </Head>
      <TopBar />
      <Row>
        <Col flex={"250px"}>
          <SideBar treeData={threadsCtxState.treeData} />
        </Col>
        <Col flex="min-content">
          <Table columns={threadsCtxState.instances.length > 0 ? getColumns(threadsCtxState.instances) : []}
            data={threadsCtxState.instances.length > 0 ? threadsCtxState.instances : []}
          />
        </Col>
      </Row>
      <button onClick={() => fetchThreads()}>threads</button>
      <button onClick={() => fetchCollections(threadsCtxState.selectedThread.id)}>collections</button>
      <button onClick={() => fetchInstances(threadsCtxState.selectedThread?.id, threadsCtxState.selectedCollection?.name)}>instances</button>
    </>
  );
};
