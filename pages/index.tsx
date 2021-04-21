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

  useEffect(() => {
    fetch("api/threads").then(resp => resp.json().then(json => console.log(json)));
  }, [])

  return (
    <>
      <Head>
        <title>textile-gui</title>
      </Head>
      <TopBar />
      <Row>
        <Col flex={"250px"}>
          <SideBar />
        </Col>
        <Col flex="auto">
          <Table />
        </Col>
      </Row>
    </>
  );
};
