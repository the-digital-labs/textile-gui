import { useContext, useEffect } from "react";
import styles from "../styles/components/SideBar.module.css";
import { Card, Spin } from 'antd';
import Tree from "./Tree";
import { AppContext } from "../store/app";

export default function SideBar({ treeData, buildTree }) {
    const [appCtxState, appCtxActions] = useContext(AppContext);

    useEffect(() => {
        buildTree()
    }, [])

    return (
        <Card title="Tree Explorer" className={styles.cardContainer}>
            {
                appCtxState.isTreeLoading &&
                <div className={styles.spinnerContainer}>
                    <Spin />
                </div>
            }
            {
                !appCtxState.isTreeLoading && <Tree treeData={treeData} />
            }
        </Card>
    );
};