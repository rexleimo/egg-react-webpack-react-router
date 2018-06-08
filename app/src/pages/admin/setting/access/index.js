import React, { PureComponent } from 'react';

import {
    Table,
    Card,
    Row,
    Col,
    Button,
    Icon,
    Tooltip,
    Input,
    Form,
    Modal
} from 'antd';

import AddForm from './add';
import EditorForm from './editor';
import ModalMe from 'component/modal';
import RolesService from 'services/access';

import './style.less';

export default class RolesAdd extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            searchClass: false,
            visible: false,
            data: [],
            editid: 0
        };
    }

    async componentWillMount() {
        this.bindRoleData();
    }

    async bindRoleData() {
        let result = await RolesService.fetchRoleFindAll();
        let data = result.data;
        for (let i in data) {
            data[i].key = data[i]._id;
        }
        console.log(data);
        this.setState({ data: data })
    }

    handleRolesEditor(id) {
        this.setState({ visible: true, editid: id });
    }

    async handleDestory(id) {
        const { confirm } = Modal;

        confirm({
            title: '你是先删除这条数据吗?',
            content: '删了这天数据将无法恢复，确定要继续操作吗?',
            okType: "danger",
            cancelText: "取消",
            onOk: async () => {
                await RolesService.fetchRoleDestroy(id);
                await this.bindRoleData();
            },
            onCancel() { }
        });

    }

    render() {

        const columns = [
            {
                title: '权限名称',
                dataIndex: "name",
                key: "name"
            }, {
                title: "权限URL",
                dataIndex: 'url',
                key: "url"
            }, {
                title: "操作",
                align: "right",
                render: (text, record, index) => {
                    return (
                        <Button.Group>
                            <Button
                                onClick={() => {
                                    this.handleRolesEditor(record.key);
                                }}>
                                <Icon type="edit" />
                            </Button>
                            <Button
                                onClick={() => {
                                    this.handleDestory(record.key);
                                }}>
                                <Icon type="delete" />
                            </Button>
                        </Button.Group>
                    )
                }
            }
        ];

        return (
            <div>
                <Card>
                    <Row>
                        <Col className="tool-hd" span={24}>
                            <Input
                                className={this.state.searchClass
                                    ? 'tools-search-active'
                                    : 'tools-search'}
                                type="text"
                                value={this.state.searchValue}
                                onChange={(e) => {
                                    let target = e.target;
                                    this.setState({ searchValue: target.value })
                                }}
                                placeholder="输入您的搜索内容" />

                            <span className="tools-icon">
                                <Icon
                                    type="search"
                                    onClick={() => {
                                        this.setState({
                                            searchClass: !this.state.searchClass
                                        })
                                    }} />
                            </span>
                            <span className="tools-icon">
                                <Tooltip placement="bottom" title="添加权限">
                                    <Icon
                                        type="plus"
                                        onClick={() => {
                                            this.setState({ visible: true, editid: 0 })
                                        }} />
                                </Tooltip>
                            </span>
                        </Col>
                    </Row>
                    <Table columns={columns} dataSource={this.state.data} />
                </Card>
                <ModalMe
                    visible={this.state.visible}
                    onClose={() => {
                        this.setState({ visible: false })
                    }}>
                    {this.state.editid
                        ? <EditorForm
                            id={this.state.editid}
                            onSuccess={(result) => {
                                this.bindRoleData();
                                this.setState({ visible: false });
                            }} />
                        : <AddForm
                            onSuccess={(result) => {
                                this.bindRoleData();
                                this.setState({ visible: false })
                            }} />}

                </ModalMe>
            </div>
        );
    }
}