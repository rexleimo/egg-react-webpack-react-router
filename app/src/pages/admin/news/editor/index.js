import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
    Form,
    DatePicker,
    TimePicker,
    Button,
    Input,
    List,
    Tag,
    message,
    Col,
    Row,
    Card
} from 'antd';

import Editor from 'component/editor';
import UploadThumb from 'component/uploadthumb';

import './add.less';

import NewsService from 'services/news';

const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;

@Form.create()
class NewEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            tagValue: "",
            tagSearchList: "none",
            Content: "",
            data: {},
            thumb: "",
            updateTags: [],
            htmlContent: ""
        };
    }

    async componentWillMount() {
        const id = this.props.match.params.id;
        let result = await NewsService.fetchNewsFindOne(id);
        
        let tags = result.tags.split(',');
        let updateTags = result.tags.split(',');
        this.setState({
            Content: result.content,
            htmlContent: result.content,
            data: result,
            tags: tags,
            updateTags: updateTags,
            thumb: result.thumb
        })
    }

    onClickTagItem(item) {
        let { tags, updateTags } = this.state;
        tags.push(item);
        updateTags.push(item);
        this.setState({ tags: tags, tagValue: '', tagSearchList: 'none', updateTags: updateTags });
    }

    handleClose(removedTag) {
        let { tags, updateTags } = this.state;
        const index = updateTags.indexOf(removedTag);
        if (index > -1) {
            updateTags.splice(index, 1);
            this.setState({ updateTags: updateTags });
        }
    }

    onTagsKeyDown(e) {
        if (e.which == 13) {
            if (e.target.value.length == 0) {
                message.error('新闻标签,请输入内容');
                return false;
            }
            let { tags, updateTags } = this.state;
            tags.push(this.state.tagValue);
            updateTags.push(this.state.tagValue);
            this.setState({ tags: tags, tagValue: "", tagSearchList: "none", updateTags: updateTags });
        }
    }

    onTagValueChange(e) {
        if (this.state.tagValue.length == 1) {
            //如果全部删除的话，隐藏表单
            this.setState({ tagSearchList: "none" });
        } else if (this.state.tagSearchList === "none") {
            //如果有输入文字的话，显示列表
            this.setState({ tagSearchList: "block" });
        }
        this.setState({ tagValue: e.target.value });
    }

    onSubmite(e) {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const id = this.props.match.params.id;
                if (this.state.tags.length == 0) {
                    message.error('请填写标签');
                    return;
                }

                if (this.state.Content.length == 0) {
                    message.error('请填写内容');
                    return;
                }

                values.tags = this.state.updateTags;
                values.content = this.state.Content;
                values.thumb = this.state.thumb;
                NewsService.fetchNewsUpdate(id, values);

            }
        });
    }

    render() {

        const FormItem = Form.Item;
        const { TextArea } = Input;

        const data = ['Racing car sprays burning ', 'Japanese princess to wed .', 'Australian walks 100km after ', 'Man charged over missing .', 'Los Angeles battles huge .'];

        const formItemLayout = {
            labelCol: {
                sm: {
                    span: 4
                }
            },
            wrapperCol: {
                sm: {
                    span: 20
                }
            }
        }

        const { getFieldDecorator } = this.props.form;

        return (
            <Card title="新增新闻">
                <div className="">
                    <Form >
                        <Row gutter={16}>
                            <Col span={17}>
                                <Form.Item {...formItemLayout} label="新闻标题">
                                    {getFieldDecorator('title', {
                                        initialValue: this.state.data.title,
                                        rules: [
                                            {
                                                required: true,
                                                message: "请填写新闻标题"
                                            }
                                        ]
                                    })(<Input type="text" />)}
                                </Form.Item>

                                <FormItem {...formItemLayout} label="新闻标签">

                                    {this.state.tags.map((el, index) => {
                                        return (
                                            <Tag closable key={index} afterClose={() => {
                                                this.handleClose(el);
                                            }}>{el}</Tag>
                                        );
                                    })}

                                    <div className="news-tags">

                                        <Input
                                            type="text"
                                            value={this.state.tagValue}
                                            className="news-tags-input"
                                            onChange={this
                                                .onTagValueChange
                                                .bind(this)}
                                            onKeyDown={this
                                                .onTagsKeyDown
                                                .bind(this)} />
                                        <div
                                            className="news-tags-search-li"
                                            style={{
                                                display: this.state.tagSearchList
                                            }}>
                                            <List
                                                dataSource={data}
                                                renderItem={(item) => {
                                                    return (
                                                        <List.Item onClick={this.onClickTagItem.bind(this, item)}>{item}</List.Item>
                                                    );
                                                }} />
                                        </div>
                                    </div>
                                </FormItem>

                                <FormItem {...formItemLayout} label="作者">
                                    {getFieldDecorator('author', {
                                        initialValue: this.state.data.author,
                                    })(<Input placeholder="" />)}
                                </FormItem>

                                <FormItem {...formItemLayout} label="原文地址">
                                    {getFieldDecorator('content_source_url', {
                                        initialValue: this.state.data.content_source_url,
                                    })(<Input placeholder="" />)}
                                </FormItem>

                                <FormItem {...formItemLayout} label="新闻简介">
                                    {getFieldDecorator('digest', {
                                        initialValue: this.state.data.digest,
                                        rules: []
                                    })(<TextArea />)}
                                </FormItem>

                                <FormItem {...formItemLayout} label="新闻内容">
                                    <Editor
                                        contentId={"test-id"}
                                        initialContent={this.state.Content}
                                        onChange={(res) => {
                                            this.setState({ Content: res })
                                        }}
                                    />
                                </FormItem>
                            </Col>

                            <Col span={5}>
                                <FormItem className="news-thumb">
                                    <UploadThumb imageUrl={this.state.thumb} onSuccess={(result) => {
                                        this.setState({
                                            thumb: result.url
                                        })
                                    }} />
                                </FormItem>

                                <FormItem className="btn-submit">
                                    <Button
                                        type="primary"
                                        onClick={this
                                            .onSubmite
                                            .bind(this)}>保存</Button>
                                    <Button
                                        type="danger"
                                        onClick={() => {
                                            history.back();
                                        }}>取消</Button>
                                </FormItem>

                            </Col>

                        </Row>
                    </Form>
                </div>
            </Card>
        );
    }
}

export default withRouter(NewEditor);