import React from 'react';
import { Link, Route } from 'react-router-dom';

import { Layout } from 'antd';
import Access from './access';
import Role from './roles';
import OAuth from './oauth';

export default class Setting extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { Content } = Layout;
        return (

            <Content>
                <div className="menu-submenu roles-submenu">
                    <Link className="menu-submenu-item" to="/admin/setting/access">
                        权限管理
                    </Link>
                    <Link className="menu-submenu-item" to="/admin/setting/role">
                        角色管理
                    </Link>
                    <Link className="menu-submenu-item" to="/admin/setting/oauth">
                        OAuth2管理
                    </Link>
                </div>
                <div className="ant-layout-admin-content">
                    <Route path="/admin/setting/access" exact={true} component={Access} />
                    <Route path="/admin/setting/role" exact={true} component={Role} />
                    <Route path="/admin/setting/oauth" exact={true} component={OAuth} />
                </div>
            </Content>

        );

    }
}