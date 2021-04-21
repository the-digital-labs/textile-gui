import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Table from "../components/Table";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>textile-gui</title>
      </Head>
      <TopBar />
      <SideBar />
      <Table />
    </div>
  )
}
