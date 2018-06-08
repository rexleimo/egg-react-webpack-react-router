import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AdminLayout from 'component/adminlayout';
import AdminIndex from './admin/index';
import AdminNews from './admin/news';
import AdminSetting from './admin/setting';
import AdminUsers from './admin/user';

import AuthLogin from './auth/login';
import Wechat from './admin/wechat';

export default class Routes extends Component {
    render() {

        return (
            <Router>
                <Switch>
                    <Route path="/login" exact={true} component={AuthLogin}></Route>
                    <AdminLayout>
                        <Switch>
                            <Route path="/admin" exact={true} component={AdminIndex} />
                            <Route path="/admin/users" component={AdminUsers} />
                            <Route path="/admin/users/settings" component={AdminUsers} />
                            <Route path="/admin/news" component={AdminNews} />
                            <Route path="/admin/wechat" component={Wechat} />
                        </Switch>

                    </AdminLayout>
                </Switch>
            </Router>
        );
    }
}