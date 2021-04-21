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

  console.log(threadsCtxState, threadsCtxActions);

  function fetchThreads() {
    fetch("api/threads").then(resp => resp.json().then(json => {
      console.log(json);
      json.forEach(thread => {
        thread.key = thread.id;
        thread.title = thread.name;
        thread.onClick = () => threadsCtxActions.setSelectedThread(thread);
      });
      json = [{ title: "Threads", key: "threads", disableCheckbox: true, children: json }]
      threadsCtxActions.setDatabases(json);
    }));
  };

  function fetchCollections(threadID) {
    fetch(`api/threads/collections/?threadID=${threadID}`).then(resp => resp.json().then(json => {
      console.log(json);
      json.forEach(collection => {
        collection.key = collection.id;
        collection.title = collection.name;
      });
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
          <SideBar treeData={threadsCtxState.databases} />
        </Col>
        <Col flex="auto">
          <Table />
        </Col>
      </Row>
      <button onClick={() => fetchThreads()}>threads</button>
      <button onClick={() => fetchCollections(threadsCtxState.selectedThread.id)}>collections</button>
      <button onClick={() => fetchInstances(threadsCtxState.selectedThread?.id, threadsCtxState.selectedCollection?.id)}>instances</button>
    </>
  );
};
