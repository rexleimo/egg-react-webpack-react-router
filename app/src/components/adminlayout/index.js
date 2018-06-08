import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { Layout, Icon, Dropdown, Menu, Avatar } from 'antd';
import './style.less';
import List from "adminpages/news";

import OauthService from 'services/auth';

export default class AdminLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: [
                {
                    id: 2,
                    name: "新闻管理",
                    url: '/admin/news',
                    exact: true
                }, {
                    id: 3,
                    name: "通用设置",
                    url: '/admin/setting',
                    exact: true
                }, {
                    id: 4,
                    name: "用户管理",
                    url: "/admin/users",
                    exact: true
                }, {
                    id: 4,
                    name: "微信模块",
                    url: "/admin/wechat",
                    exact: true
                }
            ]
        };
    }

    async hanleLogout() {
        OauthService.logout().then((result) => {
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        });
    }

    render() {

        const { Header, Footer, Sider, Content } = Layout;

        return (
            <Layout>
                <Sider>
                    <ul className="menu">
                        {this
                            .state
                            .menu
                            .map((el, index) => {
                                return (
                                    <NavLink
                                        key={index}
                                        to={el.url}
                                        className="menu-item"
                                        activeClassName="menu-item-selected"
                                        exact={el.exact}>{el.name}</NavLink>
                                );
                            })}
                    </ul>
                </Sider>
                <Layout>
                    <Header className="fixheader">
                        <div className="admin-header">
                            <div className="sider-logo"></div>
                            <div className="admin-header-right">
                                <span className="admin-header-right-active">
                                    <Icon type="search" />
                                </span>
                                <span className="admin-header-right-active">

                                    <Dropdown className="dropdown-menu-hd"
                                        overlay={(
                                            <Menu>
                                                <Menu.Item key="0">
                                                    <Link to="/admin/users/settings">
                                                        <Icon type="user" />
                                                        个人中心
                                                    </Link>
                                                </Menu.Item>
                                                <Menu.Item key="1">
                                                    <Link to="admin/settings">
                                                        <Icon type="setting" />
                                                        设置
                                                    </Link>
                                                </Menu.Item>
                                                <Menu.Divider />
                                                <Menu.Item key="3" onClick={this.hanleLogout.bind(this)} >
                                                    <Icon type="logout" />
                                                    退出
                                                </Menu.Item>
                                            </Menu>
                                        )}>
                                        <a href="ant-dropdown-link">
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            傻梦兽
                                            <Icon type="down" />
                                        </a>
                                    </Dropdown>

                                </span>
                            </div>
                        </div>
                    </Header>

                    {this.props.children}

                </Layout>
            </Layout>
        );
    }

}
