import { useContext } from "react";
import { Modal, Button } from 'antd';
import { AppContext } from "../store/app";
import SettingsForm from "./SettingsForm";

export default function SettingsModal(props) {
    const [appCtxState, appCtxActions] = useContext(AppContext);

    return (
        <Modal
            title="Settings"
            visible={appCtxState.isSettingsOpen}
            footer={[
                <Button key="cancel" onClick={() => appCtxActions.setIsSettingsOpen(false)}>
                    Cancel
                </Button>
            ]}
        >
            <SettingsForm />
            <small>Settings are saved in your browser's LocalStorage, we do not collect your data.</small>
        </Modal>
    );
};