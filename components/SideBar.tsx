import styles from "../styles/components/SideBar.module.css";
import { Collapse } from 'antd';
import Tree from "./Tree";

const { Panel } = Collapse;

export default function SideBar() {
    const treeData = [
        {
            title: 'parent 1',
            key: '0-0',
            children: [
                {
                    title: 'parent 1-0',
                    key: '0-0-0',
                    disabled: true,
                    children: [
                        {
                            title: 'leaf',
                            key: '0-0-0-0',
                            disableCheckbox: true,
                        },
                        {
                            title: 'leaf',
                            key: '0-0-0-1',
                        },
                    ],
                },
                {
                    title: 'parent 1-1',
                    key: '0-0-1',
                    children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
                },
            ],
        },
    ];

    return (
        <Collapse defaultActiveKey={['1']}>
            <Panel header="Tree Explorer" key="1">
                <Tree treeData={treeData} />
            </Panel>
        </Collapse>
    );
};