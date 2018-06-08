import React, { PureComponent } from 'react';

import { Form, Input, Icon, Button, message, Checkbox } from 'antd';

import ClientService from 'services/client';
import './style.less';

import RandomRange from 'libs/random-range';
/**
 * 添加Client前端页面
 * @param onSuccess function 返回服务端成功事件
 */
@Form.create()
export default class OAuthAdd extends PureComponent {

    constructor(props) {
        super(props);
    }

    handleSubmit() {
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            const result = ClientService.fetchCreate(values);
            this.props.onSuccess(result);
        });
    }

    async handleInitValue(name, len) {
        const { setFieldsValue } = this.props.form;
        let newStr = await RandomRange.toString(len);
        let options = Object.assign({}, { [name]: newStr });
        setFieldsValue(options);
    }

    render() {
        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        const grantOptions = [
            "password",
            "authorization_code",
            "refresh_token"
        ]

        return (
            <div>
                <FormItem label="name">
                    {getFieldDecorator('name', {})(<Input placeholder="clientId" />)}
                </FormItem>
               
                <FormItem label="clientId">
                    {getFieldDecorator('clientId', {})(<Input placeholder="clientId" addonAfter={<Icon type="sync" className="input-icon" onClick={this.handleInitValue.bind(this, "clientId", 16)} />} />)}
                </FormItem>
                <FormItem label="clientSecret">
                    {getFieldDecorator('clientSecret', {})(<Input placeholder="clientSecret" addonAfter={<Icon type="sync" className="input-icon" onClick={this.handleInitValue.bind(this, "clientSecret", 32)} />} />)}
                </FormItem>
                <FormItem label="redirectUri">
                    {getFieldDecorator('redirectUri', {})(<Input placeholder="redirectUri" />)}
                </FormItem>
                <FormItem label="grants">
                    {getFieldDecorator('grants', {})(<Checkbox.Group options={grantOptions} />)}
                </FormItem>
                <FormItem>
                    <Button onClick={this.handleSubmit.bind(this)}>提交</Button>
                </FormItem>
            </div>
        );
    }
}