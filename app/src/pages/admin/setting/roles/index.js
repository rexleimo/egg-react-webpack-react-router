import React, { PureComponent } from 'react';

import {
    Card,
    Input,
    Icon,
    Tooltip,
    message,
    Table,
    Button,
    Modal
} from 'antd';

import ModelMe from 'component/modal';

import AddFrom from './add';
import EditorFrom from './editor';
import RoleService from 'services/role';

export default class RoleComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            editid: 0,
            currentPage: 1,
            search: '',
            data: [],
            total: 0
        };
    }

    componentWillMount() {
        this.bindData(this.state.currentPage, this.setState.search);
    }

    async bindData(currentPage, search) {
        let result = await RoleService.fetchGet({ currentPage: currentPage, search: search });
        this.setState({ data: result.data.list, total: result.data.count })
    }

    handleRoleDelete(_id) {
        const confirm = Modal.confirm;
        confirm({
            title: "你确定要删除本数据吗？",
            content: "删除即将无法修复",
            okText: "确认",
            cancelText: "取消",
            okType: "danger",
            onOk: async () => {
                const result = await RoleService.fetchDestroy(_id);
                this.bindData(this.state.currentPage, this.setState.search);
            }
        });
    }

    render() {

        const columns = [
            {
                title: '角色',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: "操作",
                align: "right",
                render: (text, record, index) => {
                    const ButtonGroup = Button.Group;
                    return (
                        <ButtonGroup>
                            <Button onClick={() => {
                                this.setState({
                                    editid: record._id,
                                    visible: true
                                });
                            }}>编辑</Button>
                            <Button>特权设置</Button>
                            <Button onClick={this.handleRoleDelete.bind(this, record._id)}>删除</Button>
                        </ButtonGroup>
                    )
                }
            }
        ];

        return (
            <div>
                <Card>
                    <div className="tool-hd" span={24}>
                        <span className="tools-icon">
                            <Tooltip placement="bottom" title="新增角色">
                                <Icon
                                    type="plus"
                                    onClick={() => {
                                        this.setState({ visible: true, editid: 0 })
                                    }} />
                            </Tooltip>
                        </span>
                    </div>

                    <Table columns={columns} dataSource={this.state.data} pagination={
                        {
                            total: this.state.total,
                            onChange: (page) => {
                                this.setState({
                                    currentPage: page
                                });
                                this.bindData(page, this.state.search);
                            }
                        }
                    } />

                </Card>
                <ModelMe
                    visible={this.state.visible}
                    onClose={() => {
                        this.setState({ visible: false })
                    }}>
                    {this.state.editid == 0
                        ? <AddFrom
                            onSuccess={(res) => {
                                res.code == 20000
                                    ? message.success(res.message)
                                    : message.error(res.message);
                                this.setState({ visible: false, currentPage: 1 });
                                this.bindData(1, this.state.search);
                            }} />
                        : <EditorFrom id={this.state.editid} onSuccess={() => {
                            this.setState({
                                visible: false
                            });
                            this.bindData(1, this.state.search);
                        }} />}
                </ModelMe>
            </div>
        );
    }
}