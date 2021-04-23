import { useContext } from "react";
import { Button } from 'antd';
import { AppContext } from "../store/app";
import { ReloadOutlined } from '@ant-design/icons';

export default function SideBar({ buildTree }) {
    const [appCtxState, appCtxActions] = useContext(AppContext);

    const handleClick = () => {
        buildTree();
    };

    return (
        <Button loading={appCtxState.isTreeLoading} onClick={handleClick} icon={<ReloadOutlined />} style={{ "float": "right" }} />
    );
};