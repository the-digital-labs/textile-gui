import { useContext, useEffect } from "react";
import { Form, Input, Switch, Button } from 'antd';
import { AppContext } from "../store/app";

export default function SettingsForm(props) {
    const [appCtxState, appCtxActions] = useContext(AppContext);
    const [form] = Form.useForm();

    const handleSaveSettings = () => {
        const values = form.getFieldsValue(true);
        window.localStorage.setItem("HUB_KEY", values.hubKey);
        window.localStorage.setItem("HUB_SECRET", values.hubSecret);
        window.localStorage.setItem("DARK_MODE", values.darkMode);
    };

    useEffect(() => {
        form.setFieldsValue({
            hubKey: window.localStorage.getItem("HUB_KEY"),
            hubSecret: window.localStorage.getItem("HUB_SECRET"),
            darkMode: window.localStorage.getItem("DARK_MODE") === "true"
        });
    }, [appCtxState.isSettingsOpen]);

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSaveSettings}
        >
            <Form.Item label="Hub Key" name="hubKey" required>
                <Input />
            </Form.Item>
            <Form.Item label="Hub Secret" name="hubSecret" required>
                <Input />
            </Form.Item>
            <Form.Item label="UI Theme" name="darkMode">
                <Switch checkedChildren="Dark" unCheckedChildren="Light" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};