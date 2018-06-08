import React, { PureComponent } from 'react';

import { Card, Icon, Row, Col, Modal } from 'antd';

import './style.less';

import NewsService from 'services/news';


export default class NewList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            lists: []
        };
    }

    componentWillMount() {
        this.bindData();
    }

    async bindData() {
        const result = await NewsService.fetchNewsList({});
        this.setState({
            lists: result
        })
    }

    handleEdtor(_id) {
        this.props.history.push(`/admin/news/${_id}/editor`);
    }

    handleDelete(_id) {
        const { confirm } = Modal;

        confirm({
            title: "删除询问",
            content: "确定删除此文章吗？，删除后即将无法恢复",
            okType: "danger",
            cancelText: "取消",
            onOk: async () => {
                await NewsService.fetchRoleDestroy(_id);
                await this.bindData();
            },
            onCancel() { }
        });
    }

    showHandleNewList() {
        const Meta = Card.Meta;
        return this.state.lists.length > 0 ? <Row>
            {
                this.state.lists.map((row, i) => {
                    return (
                        <Col sm={6} md={4}>
                            <Card
                                cover={<img alt="example" src={row.thumb} />}
                                key={i}
                                actions={[<Icon type="edit" onClick={this.handleEdtor.bind(this, row._id)} />, <Icon type="delete" onClick={this.handleDelete.bind(this, row._id)} />]}
                            >
                                <Meta
                                    title={row.title}
                                    description={row.digest || '暂无描述'}
                                >
                                </Meta>
                            </Card>
                        </Col>
                    );
                })
            }
        </Row> : "暂无数据";
    }

    render() {
        return (
            <div>
                <Card title="新闻列表">
                    {this.showHandleNewList()}
                </Card>
            </div>
        )
    }
}