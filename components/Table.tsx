import React, { useContext, useEffect, useState } from "react";
import "../styles/components/Table.css";
import { Table as AntTable, Spin, Button, Input, Form } from "antd";
import { AppContext } from "../store/app";
import { ThreadsContext } from "../store/threads";
import { PlusOutlined, DeleteOutlined, EditOutlined, SaveOutlined, UndoOutlined } from "@ant-design/icons";
import ExportButton from "./ExportButton";
import { TextileClient, createInstances, deleteInstances } from "../textile";
import { ThreadID } from "@textile/hub";

const { Search } = Input;

export default function Table({ data = [], columns = [] }) {
    const [appCtxState, appCtxActions] = useContext(AppContext);
    const [threadsCtxState, threadsCtxActions] = useContext(ThreadsContext);
    const [selectedRows, setSelectedRows] = useState([]);

    const [form] = Form.useForm();

    const [rowData, setRowData] = useState(data);
    const [filteredRows, setFilteredRows] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [addingKey, setAddingKey] = useState('');

    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [isSavingLoading, setIsSavingLoading] = useState(false);


    const isRowAdding = (record) => record.key === addingKey;

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: []) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRows(selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };

    const addInstance = () => {
        const newInstance = {};
        columns.forEach(col => {
            newInstance[col.dataIndex] = "";
        });
        newInstance.key = rowData.length;
        newInstance.isAdding = true;
        setRowData([newInstance, ...rowData]);
        setIsAdding(true);
        setAddingKey(newInstance.key);
    };

    const saveNewInstance = async () => {
        try {
            setIsSavingLoading(true);
            await form.validateFields();
            const newInstance = {
                ...form.getFieldsValue(true),
                dateCreated: Date.now(),
                receipt: {},
            }
            const client = await new TextileClient().init({
                key: appCtxState.hubKey,
                secret: appCtxState.hubSecret
            });
            if (!client) return;
            const instanceResp = await createInstances(
                client,
                ThreadID.fromString(threadsCtxState.selectedThread.id),
                threadsCtxState.selectedCollection.name,
                [newInstance]
            );
            if (instanceResp) {
                setRowData([{ _id: instanceResp, key: addingKey, ...newInstance }, ...rowData.filter(row => row.key !== addingKey)]);
                setIsAdding(false);
                setAddingKey(null);
                setIsSavingLoading(false);
            }
        } catch (e) {
            console.error("Required fields missing!", e);
            setIsSavingLoading(false);
        }
    };

    const undoNewInstance = () => {
        const newRows = rowData.filter(row => !row.isAdding);
        setRowData(newRows);
        setIsAdding(false);
    };

    const deleteRowInstances = async () => {
        setIsDeleteLoading(true);
        const IDs = selectedRows.map(row => row._id);
        const client = await new TextileClient().init({
            key: appCtxState.hubKey,
            secret: appCtxState.hubSecret
        });
        if (!client) return;
        await deleteInstances(
            client,
            ThreadID.fromString(threadsCtxState.selectedThread.id),
            threadsCtxState.selectedCollection.name,
            IDs
        );
        setRowData(rowData.filter(row => !IDs.includes(row._id)));
        setSelectedRows([]);
        setIsDeleteLoading(false);
    };

    const onSearch = (searchQuery) => {
        if (searchQuery) {
            let newRows = [];
            rowData.forEach(row => {
                const values = Object.values(row);
                for (let i = 0; i < values.length; i++) {
                    if (values[i].toString().toLowerCase().indexOf(searchQuery.toString().toLowerCase()) !== -1) {
                        newRows.push(row);
                        break;
                    }
                }
            })
            setFilteredRows(newRows);
        } else {
            setFilteredRows(null);
        }
    };

    useEffect(() => {
        setRowData(data);
        data.forEach(row => {
            Object.entries(row).forEach(([key, value]) => {
                if (typeof value === "object") {
                    row[key] = JSON.stringify(value, null, 2);
                }
            })
        })
    }, [data])

    const mergedColumns = columns.map((col) => {
        return {
            ...col,
            onCell: (record) => ({
                record,
                col,
                isAdding: isRowAdding(col),
            }),
        };
    });

    const handleCellChange = (e) => {
        form.setFieldsValue({ [e.target.name]: e.target.value });
    };

    const EditableCell = ({ isAdding, ...props }) => {
        const inputPlaceholder = props.col?.dataIndex === "_id" || props.col?.dataIndex === "_mod" || props.col?.dataIndex === "key" ? "auto-generated" : "";
        const isDisabled = props.col?.dataIndex === "_mod" || props.col?.dataIndex === "key";
        const isRequired = props.col?.dataIndex !== "_id" && props.col?.dataIndex !== "_mod" && props.col?.dataIndex !== "key";
        const inputNode = <Input onChange={handleCellChange} name={props.col?.dataIndex} placeholder={inputPlaceholder} disabled={isDisabled} />
        return (
            <td {...props}>
                {props.record?.isAdding ? (
                    <Form.Item
                        name={props.col?.dataIndex}
                        rules={[
                            {
                                required: isRequired,
                                message: `required!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    props.children
                )}
            </td>
        );
    };

    return <>
        {
            appCtxState.isTableLoading &&
            <div className="tableSpinnerContainer">
                <Spin style={{ alignSelf: "center" }} size="large" />
            </div>
        }
        {
            !appCtxState.isTableLoading &&
            <div>
                <div className="tableActionsBar">
                    {
                        !isAdding && threadsCtxState.selectedCollection && threadsCtxState.selectedThread &&
                        <Button
                            className="actionButton"
                            icon={<PlusOutlined />}
                            onClick={addInstance}
                        >
                            Add
                        </Button>
                    }
                    {
                        isAdding && threadsCtxState.selectedCollection && threadsCtxState.selectedThread &&
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
                        isAdding && threadsCtxState.selectedCollection && threadsCtxState.selectedThread &&
                        <Button
                            className="actionButton"
                            icon={<UndoOutlined />}
                            onClick={undoNewInstance}
                        >
                            Undo
                        </Button>
                    }
                    <Button
                        className="actionButton"
                        icon={<EditOutlined />}
                        disabled
                    >
                        Edit
                    </Button>
                    <Button
                        className="actionButton"
                        icon={<DeleteOutlined />}
                        disabled={selectedRows?.length === 0}
                        onClick={deleteRowInstances}
                        loading={isDeleteLoading}
                    >
                        Delete
                    </Button>
                    <Search
                        placeholder="search"
                        onSearch={onSearch}
                        onChange={(e) => onSearch(e.target.value)}
                        style={{ width: 200, float: "right" }}
                    />
                    <ExportButton style={{ float: "right", marginRight: 10 }} />
                </div>
                <Form form={form} component={false}>
                    <AntTable dataSource={filteredRows || rowData}
                        columns={mergedColumns}
                        pagination={false}
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        className="table"
                        sticky={true}
                    />
                </Form>
            </div>
        }
    </>
};