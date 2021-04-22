import styles from "../styles/components/Table.module.css";
import { Table as AntTable } from "antd";

export default function Table({ data = [], columns = [] }) {
    return <AntTable dataSource={data} columns={columns} pagination={false} />
};