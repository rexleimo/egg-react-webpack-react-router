import React, {PureComponent} from 'react';

import {Form, Input, Button, message} from 'antd';

import RolesService from 'services/access';

@Form.create()
export default class RodelEditor extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            url: ""
        };
    }

    async componentWillMount() {
        var id = this.props.id;
        let result = await RolesService.fetchRoleFind(id);
        if (result) {
            let data = result.data;
            this.setState({name: data.name, url: data.url})
        }

    }

    handleSubmit() {
        this
            .props
            .form
            .validateFieldsAndScroll(async(err, values) => {
                const result = await RolesService.fetchRoleUpdate(this.props.id, values);
                this.props.onSuccess(result);
            });
    }

    render() {
        const FormItem = Form.Item;
        const {getFieldDecorator} = this.props.form;
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
            <div style={{
                paddingTop: 30
            }}>
                <Form>
                    <FormItem label="权限名称" {...formItemLayout}>
                        {getFieldDecorator('name', {
                            initialValue: this.state.name,
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
                            initialValue: this.state.url,
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
                                .handleSubmit
                                .bind(this)}>保存</Button>
                        </Button.Group>
                    </FormItem>

                </Form>
            </div>
        );
    }
}
