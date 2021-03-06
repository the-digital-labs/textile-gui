import React from "react";
import "../styles/components/Tree.css";
import { Tree as AntTree } from "antd";

export default function Tree({ treeData = [] }) {
    const onSelect = (selectedKeys: React.Key[], info: any) => {
        info.selectedNodes[0].onClick ? info.selectedNodes[0].onClick() : null;
    };

    return <AntTree
        onSelect={onSelect}
        treeData={treeData}
        style={{ height: "100%" }}
        showLine={true}
        defaultExpandAll={true}
    />
};