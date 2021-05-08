import React, { useContext } from "react";
import "../styles/components/TopBar.css";
import { PlusOutlined, DeleteOutlined, EditOutlined, SaveOutlined, UndoOutlined } from "@ant-design/icons";
import ExportButton from "./ExportButton";
import { Button, Input } from "antd";
import { AppContext } from "../store/app";
import { ThreadsContext } from "../store/threads";

const { Search } = Input;

export default function TableActions({
    isAdding,
    addInstance,
    saveNewInstance,
    isSavingLoading,
    undoInstanceAction,
    selectedRows,
    deleteRowInstances,
    isDeleteLoading,
    onSearch,
    editInstance,
    isEditing
}) {
    const [appCtxState, appCtxActions] = useContext(AppContext);
    const [threadsCtxState, threadsCtxActions] = useContext(ThreadsContext);

    return (
        <div className="tableActionsBar">
            {
                !isAdding && !isEditing && threadsCtxState.selectedCollection && threadsCtxState.selectedThread &&
                <Button
                    className="actionButton"
                    icon={<PlusOutlined />}
                    onClick={addInstance}
                >
                    Add
                        </Button>
            }
            {
                (isAdding || isEditing) && threadsCtxState.selectedCollection && threadsCtxState.selectedThread &&
                <Button
                    className="actionButton"
                    icon={<SaveOutlined />}
                    onClick={saveNewInstance}
                    loading={isSavingLoading}
                >
                    Save
                        </Button>
            }
            {
                (isAdding || isEditing) && threadsCtxState.selectedCollection && threadsCtxState.selectedThread &&
                <Button
                    className="actionButton"
                    icon={<UndoOutlined />}
                    onClick={undoInstanceAction}
                >
                    Undo
                        </Button>
            }
            {
                !isAdding && !isEditing &&
                <Button
                    className="actionButton"
                    icon={<EditOutlined />}
                    disabled={selectedRows?.length !== 1}
                    onClick={editInstance}
                >
                    Edit
                </Button>
            }
            {
                !isAdding && !isEditing &&
                <Button
                    className="actionButton"
                    icon={<DeleteOutlined />}
                    disabled={selectedRows?.length === 0}
                    onClick={deleteRowInstances}
                    loading={isDeleteLoading}
                >
                    Delete
                </Button>
            }
            <Search
                placeholder="search"
                onSearch={onSearch}
                onChange={(e) => onSearch(e.target.value)}
                style={{ width: 200, float: "right" }}
                disabled={!appCtxState.hubKey || !appCtxState.hubSecret}
            />
            <ExportButton style={{ float: "right", marginRight: 10 }} />
        </div>
    );
};