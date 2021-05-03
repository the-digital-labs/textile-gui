import React, { useContext } from "react";
import { Button, Tooltip } from 'antd';
import { AppContext } from "../store/app";
import { ReloadOutlined } from '@ant-design/icons';

export default function SideBar({ buildTree }) {
    const [appCtxState, appCtxActions] = useContext(AppContext);

    const handleClick = () => {
        buildTree();
    };

    return (
        <Tooltip title="refresh data">
            <Button loading={appCtxState.isTreeLoading} onClick={handleClick} icon={<ReloadOutlined />} style={{ "float": "right" }} />
        </Tooltip>
    );
};