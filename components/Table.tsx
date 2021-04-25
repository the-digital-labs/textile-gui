import { useContext } from "react";
import styles from "../styles/components/Table.module.css";
import { Table as AntTable, Spin } from "antd";
import { AppContext } from "../store/app";

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
            <AntTable dataSource={data}
                columns={columns}
                pagination={false}
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
            />
        }
    </>
};