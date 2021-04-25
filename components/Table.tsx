import { useContext } from "react";
import styles from "../styles/components/Table.module.css";
import { Table as AntTable, Spin, Button } from "antd";
import { AppContext } from "../store/app";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function Table({ data = [], columns = [] }) {
    const [appCtxState, appCtxActions] = useContext(AppContext);

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: []) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    return <>
        {
            appCtxState.isTableLoading && <div style={{ display: "flex", justifyContent: "center", height: "100%" }}><Spin style={{ alignSelf: "center" }} size="large" /></div>
        }
        {
            !appCtxState.isTableLoading &&
            <div>
                <div className={styles.tableActionsBar}>
                    <Button icon={<PlusOutlined />}>Add</Button>
                    <Button icon={<EditOutlined />} disabled>Edit</Button>
                    <Button icon={<DeleteOutlined />} disabled>Delete</Button>
                </div>
                <AntTable dataSource={data}
                    columns={columns}
                    pagination={false}
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                />
            </div>
        }
    </>
};