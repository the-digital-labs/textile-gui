import React, { useState } from "react";
import styles from "../styles/components/SideBar.module.css";
import { Menu, Button } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
} from '@ant-design/icons';

export default function SideBar() {
    const [collapsed, setCollapsed] = useState(false);

    return <div style={{ width: 256 }}>
        <Button type="primary" onClick={() => setCollapsed(!collapsed)} style={{ marginBottom: 16 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
            inlineCollapsed={collapsed}
        >
            <Menu.Item key="1" icon={<PieChartOutlined />}>
                Option 1
            </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        Option 2
            </Menu.Item>
                    <Menu.Item key="3" icon={<ContainerOutlined />}>
                        Option 3
            </Menu.Item>
        </Menu>
    </div>
};