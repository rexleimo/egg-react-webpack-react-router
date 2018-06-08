import React from 'react';
import { Link, Route } from 'react-router-dom';

import { Layout } from 'antd';

import AdminNewsAdd from './add';
import NewList from './list';
import NewEditor from './editor';

export default class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lists: []
        };
    }

    render() {
        const { Content } = Layout;
        return (

            <Content>
                <div className="menu-submenu">
                    <Link className="menu-submenu-item" to="/admin/news/list">
                        文章列表
                    </Link>
                    <Link className="menu-submenu-item" to="/admin/news/add">
                        添加文章
                    </Link>
                </div>
                <div className="ant-layout-admin-content">
                    <Route path="/admin/news/add" exact={true} component={AdminNewsAdd} />
                    <Route path="/admin/news/list" component={NewList} />
                    <Route path="/admin/news/:id/editor" component={NewEditor} />
                </div>
            </Content>

        );

    }
}