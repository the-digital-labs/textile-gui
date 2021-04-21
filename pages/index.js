import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Table from "../components/Table";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>textile-gui</title>
      </Head>
      <Table />
    </div>
  )
}
