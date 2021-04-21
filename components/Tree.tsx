import styles from "../styles/components/Tree.module.css";
import { Tree as AntTree } from "antd";

export default function Tree({ treeData = [] }) {

    const onSelect = (selectedKeys: React.Key[], info: any) => {
        console.log('selected', selectedKeys, info);
    };

    const onCheck = (checkedKeys: React.Key[], info: any) => {
        console.log('onCheck', checkedKeys, info);
    };

    return <AntTree
        checkable
        defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultSelectedKeys={['0-0-0', '0-0-1']}
        defaultCheckedKeys={['0-0-0', '0-0-1']}
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={treeData}
        style={{ height: "100%" }}
    />
};