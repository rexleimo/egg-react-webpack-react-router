import React, {PureComponent} from 'react';

import {Form, Input, Button, message} from 'antd';

import RoleService from 'services/role';

/**
 * 添加From
 * @param function onSuccess 成功的回调函数
 */
@Form.create()
export default class RoleForm extends PureComponent {
    constructor(props) {
        super(props)
    }

    handleSubmit() {
        this
            .props
            .form
            .validateFieldsAndScroll(async (err, values) => {
                if (!err) {
                    const result = await RoleService.fetchCreate(values);
                    this
                        .props
                        .onSuccess(result);
                }
            });
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
            <div>
                <FormItem {...formItemLayout} label="角色名称">
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: "角色名称不能为空"
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        className="button-block"
                        onClick={this
                            .handleSubmit
                            .bind(this)}>
                        提交
                    </Button>
                </FormItem>

            </div>
        );
    }
}