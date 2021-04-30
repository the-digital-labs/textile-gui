import styles from "../styles/components/TopBar.module.css";
import { Menu } from 'antd';
import { GithubOutlined } from "@ant-design/icons";

export default function TopBar() {
    return <Menu mode="horizontal" selectable={false}>
        <Menu.Item key="title">
            <h2 style={{ marginBottom: 0 }}>textile-gui</h2>
        </Menu.Item>
        <Menu.Item key="github" style={{ float: "right" }}>
            <a href="https://github.com/the-digital-labs/textile-gui" target="_blank">
                <GithubOutlined style={{ fontSize: 20 }} /> Github
            </a>
        </Menu.Item>
    </Menu>
};