import React, { PureComponent } from 'react';

import { Form, Input, Button, message } from 'antd';

import RoleService from 'services/role';

@Form.create()
export default class Editro extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    async componentWillMount() {
        let id = this.props.id;
        let role = await RoleService.fetchShow(id);
        this.setState({
            data: role.data
        });

    }

    async handleSubmit() {
        let id = this.props.id;
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                let role = await RoleService.fetchUpdate(id, values);
                role.code == 20000 ? message.success(role.message) : message.error(role.message);
                this.props.onSuccess(role);
            }
        })
    }

    render() {

        const { getFieldDecorator } = this.props.form;

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

        return (
            <div>
                <FormItem {...formItemLayout} label="角色名称">
                    {getFieldDecorator('name', {
                        initialValue: this.state.data.name,
                        rules: [
                            {
                                required: true,
                                message: "角色名称不能为空"
                            }
                        ]
                    })(<Input />)}
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
