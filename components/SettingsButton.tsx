import { useContext } from "react";
import { Modal, Button, Form, Input, Switch } from 'antd';
import { AppContext } from "../store/app";
import { SettingOutlined } from "@ant-design/icons";

export default function SettingsButton(props) {
    const [appCtxState, appCtxActions] = useContext(AppContext);
    const [form] = Form.useForm();

    const handleValuesChange = (values) => {
        console.log(values);
    };

    const handleSaveSettings = () => {

    };

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
                footer={[
                    <Button key="cancel" onClick={() => appCtxActions.setIsSettingsOpen(false)}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSaveSettings}>
                        Save
                    </Button>
                ]}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onValuesChange={handleValuesChange}
                >
                    <Form.Item label="Hub Key" required>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Hub Secret" required>
                        <Input />
                    </Form.Item>
                    <Form.Item label="UI Theme" required>
                        <Switch checkedChildren="Light" unCheckedChildren="Dark" defaultChecked />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};