import React, { useContext, useEffect } from "react";
import { Form, Input, Button } from 'antd';
import { AppContext } from "../store/app";

export default function SettingsForm(props) {
    const [appCtxState, appCtxActions] = useContext(AppContext);
    const [form] = Form.useForm();

    const handleSaveSettings = () => {
        const values = form.getFieldsValue(true);
        window.localStorage.setItem("HUB_KEY", values.hubKey);
        window.localStorage.setItem("HUB_SECRET", values.hubSecret);
        appCtxActions.setHubKey(values.hubKey);
        appCtxActions.setHubSecret(values.hubSecret);
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
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};