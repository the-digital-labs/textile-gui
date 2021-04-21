import styles from "../styles/components/SideBar.module.css";
import { Collapse } from 'antd';
import Tree from "./Tree";

const { Panel } = Collapse;

export default function SideBar({ treeData }) {
    return (
        <Collapse defaultActiveKey={['1']}>
            <Panel header="Tree Explorer" key="1">
                <Tree treeData={treeData} />
            </Panel>
        </Collapse>
    );
};