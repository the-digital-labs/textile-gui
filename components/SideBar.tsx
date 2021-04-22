import { useContext } from "react";
import styles from "../styles/components/SideBar.module.css";
import { Collapse, Spin } from 'antd';
import Tree from "./Tree";
import { AppContext } from "../store/app";

const { Panel } = Collapse;

export default function SideBar({ treeData, buildTree }) {
    const [appCtxState, appCtxActions] = useContext(AppContext);

    return (
        <Collapse onChange={buildTree}>
            <Panel header="Tree Explorer" key="1">
                {
                    appCtxState.isTreeLoading &&
                    <div className={styles.spinnerContainer}>
                        <Spin />
                    </div>
                }
                {
                    !appCtxState.isTreeLoading && <Tree treeData={treeData} />
                }
            </Panel>
        </Collapse >
    );
};