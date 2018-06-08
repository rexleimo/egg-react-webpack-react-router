import React, { PureComponent } from 'react';

import { Link, Route } from 'react-router-dom';

import { Card } from 'antd';

import UserService from 'services/user';

export default class UserList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    async componentWillMount() {
        const result = await UserService.adminList();
        this.setState({
            data: result.data
        });
    }

    render() {
        return (
            <div>
                <Card title="用户列表">
                    {this.state.data.map((row, i) => {
                        return (
                            <div>{row.username}</div>
                        );
                    })}
                </Card>
            </div>
        );
    }
}