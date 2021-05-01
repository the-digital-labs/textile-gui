import { useContext, useEffect } from "react";
import styles from "../styles/components/SideBar.module.css";
import { Card, Spin } from 'antd';
import Tree from "./Tree";
import RefreshButton from "./RefreshButton";
import { AppContext } from "../store/app";
import SettingsButton from "./SettingsButton";

export default function SideBar({ treeData, buildTree }) {
    const [appCtxState, appCtxActions] = useContext(AppContext);

    useEffect(() => {
        buildTree()
    }, [])

    return (
        <Card
            title={<>Tree Explorer <RefreshButton buildTree={buildTree} /></>}
            className={styles.cardContainer}
            bodyStyle={{ height: "calc(100% - 63px)" }}
        >
            {
                appCtxState.isTreeLoading &&
                <div className={styles.spinnerContainer}>
                    <Spin />
                </div>
            }
            {
                !appCtxState.isTreeLoading && <Tree treeData={treeData} />
            }
            <div className={styles.sideBarToolbar}>
                <SettingsButton />
            </div>
        </Card>
    );
};