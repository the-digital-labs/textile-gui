import { useContext } from "react";
import { Button } from 'antd';
import { AppContext } from "../store/app";
import { SettingOutlined } from "@ant-design/icons";
import SettingsModal from "./SettingsModal";

export default function SettingsButton(props) {
    const [appCtxState, appCtxActions] = useContext(AppContext);

    return (
        <>
            <Button
                icon={<SettingOutlined />}
                onClick={() => appCtxActions.setIsSettingsOpen(true)}
                disabled={appCtxState.isSettingsOpen}
            />
            <SettingsModal />
        </>
    );
};