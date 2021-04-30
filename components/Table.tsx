import { useContext, useEffect, useState } from "react";
import styles from "../styles/components/Table.module.css";
import { Table as AntTable, Spin, Button, Input, InputNumber, Form } from "antd";
import { AppContext } from "../store/app";
import { ThreadsContext } from "../store/threads";
import { PlusOutlined, DeleteOutlined, EditOutlined, SaveOutlined, UndoOutlined } from "@ant-design/icons";

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
            await form.validateFields();
            const newInstance = {
                ...form.getFieldsValue(true),
                dateCreated: Date.now(),
                receipt: {},
            }
            const resp = await fetch(`api/threads/instances`, {
                method: "POST", body: JSON.stringify({
                    collectionName: threadsCtxState.selectedCollection.name,
                    threadID: threadsCtxState.selectedThread.id,
                    instance: newInstance
                })
            })
            if (resp.ok) {
                const newID = await resp.json();
                setRowData([{ _id: newID, key: addingKey, ...newInstance }, ...rowData.filter(row => row.key !== addingKey)]);
                setIsAdding(false);
                setAddingKey(null);
            }
        } catch (e) {
            console.error("Required fields missing!", e);
        }
    };

    const undoNewInstance = () => {
        const newRows = rowData.filter(row => !row.isAdding);
        setRowData(newRows);
        setIsAdding(false);
    };

    const deleteInstances = () => {
        const IDs = selectedRows.map(row => row._id);
        fetch(`api/threads/instances`, {
            method: "DELETE", body: JSON.stringify({
                collectionName: threadsCtxState.selectedCollection.name,
                threadID: threadsCtxState.selectedThread.id,
                IDs
            })
        }).then(resp => {
            if (resp.ok) {
                setRowData(rowData.filter(row => !IDs.includes(row._id)));
            }
            setSelectedRows([]);
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
            appCtxState.isTableLoading && <div style={{ display: "flex", justifyContent: "center", height: "100%" }}><Spin style={{ alignSelf: "center" }} size="large" /></div>
        }
        {
            !appCtxState.isTableLoading &&
            <div>
                <div className={styles.tableActionsBar}>
                    {
                        !isAdding && threadsCtxState.selectedCollection && threadsCtxState.selectedThread &&
                        <Button className={styles.actionButton} icon={<PlusOutlined />} onClick={addInstance}>Add</Button>
                    }
                    {
                        isAdding && threadsCtxState.selectedCollection && threadsCtxState.selectedThread &&
                        <Button className={styles.actionButton} icon={<SaveOutlined />} onClick={saveNewInstance}>Save</Button>
                    }
                    {
                        isAdding && threadsCtxState.selectedCollection && threadsCtxState.selectedThread &&
                        <Button className={styles.actionButton} icon={<UndoOutlined />} onClick={undoNewInstance}>Undo</Button>
                    }
                    <Button className={styles.actionButton} icon={<EditOutlined />} disabled>Edit</Button>
                    <Button className={styles.actionButton} icon={<DeleteOutlined />} disabled={selectedRows?.length === 0} onClick={deleteInstances}>Delete</Button>
                    <Search placeholder="search" onSearch={onSearch} onChange={(e) => onSearch(e.target.value)} style={{ width: 200, float: "right" }} />
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
                        className={styles.table}
                        sticky={true}
                    />
                </Form>
            </div>
        }
    </>
};