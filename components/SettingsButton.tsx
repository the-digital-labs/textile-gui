import { useContext } from "react";
import { Modal, Button } from 'antd';
import { AppContext } from "../store/app";
import { SettingOutlined } from "@ant-design/icons";

export default function SettingsButton(props) {
    const [appCtxState, appCtxActions] = useContext(AppContext);

    return (
        <>
            <Button
                icon={<SettingOutlined />}
                onClick={() => appCtxActions.setIsSettingsOpen(true)}
                disabled={appCtxState.isSettingsOpen}
            />
            <Modal
                title="Settings"
                visible={appCtxState.isSettingsOpen}
                onOk={() => appCtxActions.setIsSettingsOpen(false)}
                onCancel={() => appCtxActions.setIsSettingsOpen(false)}
            >
                <p>Hub Key:</p>
                <p>Hub Secret:</p>
                <p>Dark Mode:</p>
            </Modal>
        </>
    );
};