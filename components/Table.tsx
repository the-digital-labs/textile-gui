import React, { useContext, useEffect, useState } from "react";
import "../styles/components/Table.css";
import { Table as AntTable, Spin, Input, Form, notification } from "antd";
import { AppContext } from "../store/app";
import { ThreadsContext } from "../store/threads";
import { TextileClient, createInstances, deleteInstances, updateInstanceByID } from "../textile";
import { ThreadID } from "@textile/hub";
import TableActions from "./TableActions";

export default function Table({ data = [], columns = [] }) {
    const [appCtxState, appCtxActions] = useContext(AppContext);
    const [threadsCtxState, threadsCtxActions] = useContext(ThreadsContext);
    const [selectedRows, setSelectedRows] = useState([]);

    const [form] = Form.useForm();

    const [rowData, setRowData] = useState(data);
    const [filteredRows, setFilteredRows] = useState(null);

    const [isAdding, setIsAdding] = useState(false);
    const [addingKey, setAddingKey] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [editingKey, setEditingKey] = useState('');

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

    const editInstance = () => {
        const instanceIndex = rowData.findIndex(row => row.key === selectedRows[0].key);
        const editingInstance = rowData[instanceIndex];
        editingInstance.isEditing = true;
        const newRowData = rowData;
        newRowData[instanceIndex] = editingInstance;
        form.setFieldsValue(selectedRows[0]);
        setRowData(newRowData);
        setIsEditing(true);
        setEditingKey(editingInstance.key);
    };

    const saveInstanceEdit = async () => {
        try {
            setIsSavingLoading(true);
            await form.validateFields();
            const newInstance = form.getFieldsValue(true);
            const client = await new TextileClient().init({
                key: appCtxState.hubKey,
                secret: appCtxState.hubSecret
            });
            if (!client) return;
            let typedInstance = {};
            Object.entries(newInstance).forEach(([key, value]) => {
                if (value.toString().substring(0, 1) === "{") {
                    typedInstance[key] = JSON.parse(value.toString());
                } else {
                    typedInstance[key] = value;
                }
            });
            delete typedInstance.isEditing;
            delete typedInstance.key;
            const instanceResp = await updateInstanceByID(
                client,
                ThreadID.fromString(threadsCtxState.selectedThread.id),
                threadsCtxState.selectedCollection.name,
                newInstance._id,
                typedInstance
            );
            if (instanceResp) {
                const instanceIndex = rowData.findIndex(row => row.key === newInstance.key);
                const newRowData = rowData;
                newRowData[instanceIndex] = newInstance;
                setRowData(newRowData);
                setIsEditing(false);
                setEditingKey(null);
                setSelectedRows([]);
                setIsSavingLoading(false);
                notification.success({
                    message: `Edit successful!`,
                    description: "Updated your selected instance.",
                    placement: "bottomRight"
                })
            }
        } catch (e) {
            console.error("Required fields missing!", e);
            notification.error({
                message: `Error editing!`,
                description: "Missing required fields",
                placement: "bottomRight"
            })
            setIsSavingLoading(false);
        }
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
                notification.success({
                    message: `New instance created!`,
                    description: "Successfully saved your new instance.",
                    placement: "bottomRight"
                })
            }
        } catch (e) {
            console.error("Required fields missing!", e);
            notification.error({
                message: `Error creating instance!`,
                description: "Missing required fields",
                placement: "bottomRight"
            })
            setIsSavingLoading(false);
        }
    };

    const undoInstanceAction = () => {
        let newRows = rowData.filter(row => !row.isAdding);
        newRows.forEach((row) => {
            row.isEditing = false;
        })
        setRowData(newRows);
        setIsAdding(false);
        setIsEditing(false);
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
        notification.success({
            message: `Deleted instance!`,
            description: "Removed your selected instance.",
            placement: "bottomRight"
        })
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

    const EditableCell = ({ isAdding, isEditing, ...props }) => {
        const inputPlaceholder = props.col?.dataIndex === "_id" || props.col?.dataIndex === "_mod" || props.col?.dataIndex === "key" ? "auto-generated" : "";
        const isDisabled = props.col?.dataIndex === "_mod" || props.col?.dataIndex === "key";
        const isRequired = props.col?.dataIndex !== "_id" && props.col?.dataIndex !== "_mod" && props.col?.dataIndex !== "key";
        const inputNode = <Input onChange={handleCellChange} name={props.col?.dataIndex} placeholder={inputPlaceholder} disabled={isDisabled} />
        return (
            <td {...props}>
                {props.record?.isAdding || props.record?.isEditing ? (
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
                <TableActions
                    isAdding={isAdding}
                    addInstance={addInstance}
                    saveNewInstance={saveNewInstance}
                    isSavingLoading={isSavingLoading}
                    undoInstanceAction={undoInstanceAction}
                    selectedRows={selectedRows}
                    deleteRowInstances={deleteRowInstances}
                    isDeleteLoading={isDeleteLoading}
                    onSearch={onSearch}
                    editInstance={editInstance}
                    isEditing={isEditing}
                    saveInstanceEdit={saveInstanceEdit}
                />
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