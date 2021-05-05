import React, { useContext } from "react";
import { Modal } from 'antd';
import { AppContext } from "../store/app";
import SettingsForm from "./SettingsForm";

export default function SettingsModal(props) {
    const [appCtxState, appCtxActions] = useContext(AppContext);

    return (
        <Modal
            title="Settings"
            visible={appCtxState.isSettingsOpen}
            onCancel={() => appCtxActions.setIsSettingsOpen(false)}
            footer={null}
        >
            <SettingsForm />
        </Modal>
    );
};