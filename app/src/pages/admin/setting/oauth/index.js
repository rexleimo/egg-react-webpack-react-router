import React, { PureComponent } from 'react';

import { Card, Row, Col, Input, Icon, Tooltip, Modal, message } from 'antd';
import ModalMe from 'component/modal';
import Add from './add';
import Editor from './editor';
import ClientService from 'services/client';

export default class OAuthComponet extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: false,
            searchValue: "",
            visible: false,
            editid: 0,
            data: []
        }
    }

    async componentDidMount() {
        this.bindData();


    }

    async bindData() {
        const result = await ClientService.fetchGet({});
        this.setState({
            data: result.data
        });
    }

    handleEditor(id) {
        this.setState({
            editid: id,
            visible: true
        })
    }

    handleDelete(_id) {
        const confirm = Modal.confirm;
        confirm({
            title: "你确定要删除本数据吗？?",
            content: "删除即将无法修复",
            okText: "确定",
            cancelText: "取消",
            onOk: async () => {
                const result = await ClientService.fetchDelete(_id);
                if (result.code == 20000) {
                    message.success('删除成功');
                    this.bindData();
                } else {
                    message.error('删除失败');
                }
            }
        });
    }


    render() {
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
                                <Tooltip placement="bottom" title="添加OAuth">
                                    <Icon
                                        type="plus"
                                        onClick={() => {
                                            this.setState({ visible: true, editid: 0 })
                                        }} />
                                </Tooltip>
                            </span>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        {this.state.data.map((row, i) => {
                            return (
                                <Col span={4} key={i}>
                                    <Card
                                        actions={[
                                            <Icon type="edit" onClick={this.handleEditor.bind(this, row._id)} />,
                                            <Icon type="delete" onClick={this.handleDelete.bind(this, row._id)} />
                                        ]}
                                    >{row.name}</Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Card>
                <ModalMe
                    visible={this.state.visible}
                    onClose={() => {
                        this.setState({ visible: false })
                    }}>

                    {
                        this.state.editid == 0 ?
                            <Add onSuccess={(result) => {
                                this.setState({
                                    visible: false
                                });

                            }} /> : <Editor id={this.state.editid} onSuccess={
                                () => {
                                    this.setState({
                                        visible: false
                                    });
                                }
                            } />
                    }
                </ModalMe>
            </div>
        );
    }
}