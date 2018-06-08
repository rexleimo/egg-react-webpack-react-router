import React, { PureComponent } from 'react';

import { Link, Route, Switch } from 'react-router-dom';
import './style.less';

import { Layout } from 'antd';
import WechatMenu from './menu';
import Material from './material';
import MaterialNewsEditor from './material/news/editor';
import MaterialNewsAdd from './material/news/add';


export default class WeChat extends PureComponent {

    constructor(props) {
        super(props);

    }

    render() {
        const { Content } = Layout;
        return (
            <Content>
                <div className="menu-submenu roles-submenu">
                    <Link className="menu-submenu-item" to="/admin/wechat/menu">
                        菜单管理
                    </Link>
                    <Link className="menu-submenu-item" to="/admin/wechat/material">
                        素材管理
                    </Link>
                </div>
                <div className="ant-layout-admin-content">
                    <Switch>
                        <Route exact component={WechatMenu} path="/admin/wechat/menu" />
                        <Route exact component={Material} path="/admin/wechat/material" />
                        <Route exact component={MaterialNewsEditor} path="/admin/wechat/material/news/:id/ediotr" />
                        <Route exact component={MaterialNewsAdd} path="/admin/wechat/material/news/add" />
                    </Switch>
                </div>
            </Content>
        );
    }
}