import React, { useContext, useEffect } from "react";
import "../styles/components/SideBar.css";
import { Card, Spin } from 'antd';
import Tree from "./Tree";
import RefreshButton from "./RefreshButton";
import { AppContext } from "../store/app";
import SettingsButton from "./SettingsButton";

export default function SideBar({ treeData, buildTree }) {
    const [appCtxState, appCtxActions] = useContext(AppContext);

    useEffect(() => {
        if (appCtxState.hubKey && appCtxState.hubSecret) {
            buildTree();
        }
    }, [appCtxState.hubKey, appCtxState.hubSecret])

    const sideBarHeader = () => {
        return (
            <>
                Tree Explorer
                {
                    appCtxState.hubKey && appCtxState.hubSecret &&
                    <RefreshButton buildTree={buildTree} />
                }
            </>
        );
    };

    return (
        <Card
            title={sideBarHeader()}
            className="cardContainer"
            bodyStyle={{ height: "calc(100% - 63px)" }}
        >
            {
                appCtxState.isTreeLoading &&
                <div className="spinnerContainer">
                    <Spin />
                </div>
            }
            {
                !appCtxState.isTreeLoading && <Tree treeData={treeData} />
            }
            <div className="sideBarToolbar">
                <SettingsButton />
            </div>
        </Card>
    );
};