import { useState, useContext } from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Table from "../components/Table";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import { Row, Col } from "antd";
import { ThreadsContext } from "../store/threads";

export default function Home() {
  const [threadsCtxState, threadsCtxActions] = useContext(ThreadsContext);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  console.log(threadsCtxState, threadsCtxActions);

  return (
    <div>
      <Head>
        <title>textile-gui</title>
      </Head>
      <TopBar />
      <Row>
        <Col flex={isSideBarOpen ? "250px" : "1px"}>
          <SideBar isOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
        </Col>
        <Col flex="auto">
          <Table />
        </Col>
      </Row>
    </div>
  );
};
