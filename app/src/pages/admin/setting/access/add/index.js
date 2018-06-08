import React, {PureComponent} from 'react';
import {Form, Input, Button, message} from 'antd';

import RolesService from 'services/access';

/**
 * 权限添加的表单
 * props
 * @param function onSuccess(result) 服务器响应的回调函数
 */
@Form.create()
export default class RolesAdd extends PureComponent {
    constructor(props) {
        super(props);
    }

    handleOk(values) {
        this
            .props
            .form
            .validateFieldsAndScroll(async(err, values) => {
                const result = await RolesService.fetchRoleCreate(values);
                result.code == 20000
                    ? message.success(result.message)
                    : message.error(result.message);
                this.props.onSuccess(result);
            })
    }

    render() {

        const FormItem = Form.Item;

        const formItemLayout = {
            labelCol: {
                sm: {
                    span: 5
                }
            },
            wrapperCol: {
                sm: {
                    span: 18
                }
            }
        };

        const {getFieldDecorator} = this.props.form;

        return (
            <div style={{
                paddingTop: 30
            }}>
                <Form>
                    <FormItem label="权限名称" {...formItemLayout}>
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: "请填写权限名称"
                                }
                            ]
                        })(<Input/>)}
                    </FormItem>

                    <FormItem label="权限URL" {...formItemLayout}>

                        {getFieldDecorator('url', {
                            rules: [
                                {
                                    required: true,
                                    message: "请填写权限URL"
                                }
                            ]
                        })(<Input/>)
}
                    </FormItem>

                    <FormItem {...formItemLayout} label="操作">
                        <Button.Group>
                            <Button
                                onClick={this
                                .handleOk
                                .bind(this)}>保存</Button>
                        </Button.Group>
                    </FormItem>

                </Form>
            </div>
        );
    }
}