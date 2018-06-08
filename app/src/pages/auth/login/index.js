import React, { PureComponent } from 'react';

import { Form, Input, Icon, Button } from 'antd';

import AuthService from 'services/auth';
import './sytle.less';

@Form.create()
export default class Login extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        AuthService.login();
    }

    async handleSubmit() {
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                const result = await AuthService.login(values);
                const accessToken = result.accessToken;
                localStorage.setItem('accessToken', accessToken);
                window.location.href = '/admin';
            }
        });
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <div className="login">
                <div className="login-title">
                    <h2 style={{ color: "#fff" }}>登录</h2>
                </div>
                <div className="login-bd">
                    <Form.Item>
                        {
                            getFieldDecorator('username', {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入用户名"
                                    }
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="请输入用户名"
                                />
                            )
                        }
                    </Form.Item>

                    <Form.Item>
                        {
                            getFieldDecorator('userpwd', {
                                rules: [{
                                    required: true,
                                    message: "请输入密码"
                                }]
                            })(
                                <Input type="password"
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="请输入密码"
                                />
                            )
                        }
                    </Form.Item>

                    <Form.Item style={{ textAlign: "center" }}>
                        <Button onClick={this.handleSubmit.bind(this)}>登录</Button>
                    </Form.Item>
                </div>
            </div>
        );
    }
}