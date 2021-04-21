import styles from "../styles/components/TopBar.module.css";
import { Menu } from 'antd';

export default function TopBar() {
    return <Menu mode="horizontal">
        <Menu.Item key="mail">
            Navigation One
        </Menu.Item>
        <Menu.Item key="app">
            Navigation Two
        </Menu.Item>
    </Menu>
};