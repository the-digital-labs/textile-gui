import React, { useContext } from 'react';
import { Button } from 'antd';
import { ExportOutlined } from "@ant-design/icons";
import { ThreadsContext } from "../store/threads";

export default function ExportButton(props) {
    const [threadsCtxState, threadsCtxActions] = useContext(ThreadsContext);

    const handleExport = () => {
        const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(threadsCtxState.instances, null, 2))}`;
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${threadsCtxState.selectedCollection.name}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <Button
            icon={<ExportOutlined />}
            onClick={handleExport}
            disabled={threadsCtxState.instances?.length === 0}
            style={props.style}
        >
            Export
        </Button>
    );
};