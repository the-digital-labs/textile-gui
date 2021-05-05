import React from "react";
import "../styles/components/TopBar.css";
import { GithubOutlined } from "@ant-design/icons";

export default function TopBar() {
    return (
        <div className="topBar">
            <h2 className="brandName">textile-gui</h2>
            <a href="https://github.com/the-digital-labs/textile-gui" target="_blank" className="githubIcon">
                <GithubOutlined style={{ fontSize: 20 }} />
            </a>
        </div>
    );
};