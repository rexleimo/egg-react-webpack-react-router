import React, { PureComponent } from 'react';

import { Link, Route, Switch } from 'react-router-dom';

import { Layout } from 'antd';
import UserList from './list';
import UserAdd from './add';


export default class UserIndex extends PureComponent {

    constructor(props) {
        super(props);
       
    }

    

    render() {
        const { Content } = Layout;
        return (
            <Content>
                <div className="menu-submenu roles-submenu">
                    <Link className="menu-submenu-item" to="/admin/users/index">
                        用户列表
                    </Link>
                    <Link className="menu-submenu-item" to="/admin/users/add">
                        添加用户
                    </Link>
                </div>
                <div className="ant-layout-admin-content">
                    <Switch>
                        <Route exact component={UserList} path="/admin/users/index" />
                        <Route component={UserAdd} path="/admin/users/add" />
                    </Switch>
                </div>
            </Content>
        );
    }
}