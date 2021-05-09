import React, { useContext, useEffect } from "react";
import { Form, Input, Button } from 'antd';
import { AppContext } from "../store/app";
import { SaveOutlined } from '@ant-design/icons';

export default function SettingsForm(props) {
    const [appCtxState, appCtxActions] = useContext(AppContext);
    const [form] = Form.useForm();

    const handleSaveSettings = () => {
        const values = form.getFieldsValue(true);
        window.localStorage.setItem("HUB_KEY", values.hubKey);
        window.localStorage.setItem("HUB_SECRET", values.hubSecret);
        appCtxActions.setHubKey(values.hubKey);
        appCtxActions.setHubSecret(values.hubSecret);
        appCtxActions.setIsSettingsOpen(false);
    };

    useEffect(() => {
        form.setFieldsValue({
            hubKey: appCtxState.hubKey,
            hubSecret: appCtxState.hubSecret,
        });
    }, [appCtxState.isSettingsOpen]);

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSaveSettings}
        >
            <Form.Item label="Hub Key" name="hubKey" required>
                <Input.Password />
            </Form.Item>
            <Form.Item label="Hub Secret" name="hubSecret" required>
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <p>Get your Textile API credentials by following their guide: <br />
                    <a href="https://docs.textile.io/hub/apis/#creating-keys" target="_blank">https://docs.textile.io/hub/apis/#creating-keys</a>
                </p>
                <small>Settings are saved in your browser's LocalStorage, we do not collect your data.</small>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block icon={<SaveOutlined />}>
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};