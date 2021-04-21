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

export default function SideBar({ isOpen, setIsSideBarOpen }) {
    return <div>
        <Button type="primary" onClick={() => setIsSideBarOpen(!isOpen)} style={{ width: "100%" }}>
            {React.createElement(isOpen ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
            inlineCollapsed={!isOpen}
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