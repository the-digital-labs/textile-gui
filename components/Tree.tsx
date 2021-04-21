import { useContext } from "react";
import styles from "../styles/components/Tree.module.css";
import { Tree as AntTree } from "antd";
import { ThreadsContext } from "../store/threads";

export default function Tree({ treeData = [] }) {
    const [threadsCtxState, threadsCtxActions] = useContext(ThreadsContext);

    const onSelect = (selectedKeys: React.Key[], info: any) => {
        info.selectedNodes[0].onClick();
    };

    return <AntTree
        onSelect={onSelect}
        treeData={treeData}
        style={{ height: "100%" }}
    />
};