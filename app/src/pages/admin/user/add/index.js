import React, { PureComponent } from 'react';

import { Card, Form, Input, Row, Col, Button } from 'antd';
import UserService from 'services/user';

@Form.create()
export default class UserAdd extends PureComponent {

    constructor(props) {
        super(props);
    }

    handleSubmit() {
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                console.log(values);
                await UserService.adminCreate(values);
            }
        });
    }

    render() {
        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title="添加用户信息">
                    <Row gutter={16}>
                        <Col span={8}>
                            <FormItem label="邮箱：">
                                {getFieldDecorator('email', {
                                    rules: [
                                        { required: true, message: "请输入邮箱" },
                                        { type: "email", message: "请输入正确的邮箱" },
                                    ]
                                })(<Input type="email" />)}
                            </FormItem>

                            <FormItem label="用户名：">
                                {getFieldDecorator('username', {
                                    rules: [
                                        { required: true, message: '用户名不能为空' },
                                        { pattern: new RegExp('^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$'), message: "用户名只能字母、中文、数字组合" }
                                    ]
                                })(<Input />)}
                            </FormItem>

                            <FormItem label="登录密码：">
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入密码"
                                        }
                                    ]
                                })(<Input type="password" />)}
                            </FormItem>
                            <FormItem>
                                <Button onClick={this.handleSubmit.bind(this)}>提交</Button>
                            </FormItem>
                        </Col>

                    </Row>
                </Card>
            </div>
        );
    }
}