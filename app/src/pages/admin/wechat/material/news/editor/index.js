import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';

import {Card, Input, Form, Button, message} from 'antd';
import LzEditor from 'braft-editor';

import WechatService from 'services/wechat';
import UploadThumb from 'component/uploadthumb';

import Config from '../config';

import './style.less';

class Edtior extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            news: {
                news_item: []
            },
            newsItemSelect: 0,
            title: "",
            author: "",
            content_source_url: "",
            content: "",
            digest: "",
            thumb_url: "",
        };
    }

    //初始华
    async componentWillMount() {
        const queryId = this.props.match.params.id;

        var news = await WechatService.getMaterial(queryId);
        console.log(news)
        this.setState({
            news: news,
            title: news.news_item[0].title,
            author: news.news_item[0].author,
            content_source_url: news.news_item[0].content_source_url,
            content: news.news_item[0].content.replace(/data-src/g, 'src'),
            digest: news.news_item[0].digest,
            thumb_url: news.news_item[0].thumb_url,
        })
        this.editorInstance.setContent(news.news_item[0].content.replace(/data-src/g, 'src'), "html");
    }

    /**
     * 获取编辑操作
     * @param {*} index
     */
    handleNewsItemSelect(index) {
        this.setState({
            newsItemSelect: index,
            title: this.state.news.news_item[index].title,
            author: this.state.news.news_item[index].author,
            content_source_url: this.state.news.news_item[index].content_source_url,
            content: this.state.news.news_item[index].content.replace(/data-src/g, 'src'),
            digest: this.state.news.news_item[index].digest,
            thumb_url: this.state.news.news_item[index].thumb_url,
        })

        this.editorInstance.setContent(this.state.news.news_item[index].content.replace(/data-src/g, 'src'), "html");
    }

    /**
     * 修改图文信息 Input 时的操作
     * @param {*} key
     * @param {*} input
     */
    handleInputChange(key, input) {
        var news_item = this.state.news.news_item;
        //获取当前操作的对象
        var editor = news_item[this.state.newsItemSelect];
        Object.assign(editor, {[key]: input.target.value});

        news_item[this.state.newsItemSelect] = editor;

        this.setState({
            [key]: input.target.value,
            news: Object.assign({}, {"news_item": news_item})
        })
    }

    /**
     * 添加一片图文
     */
    handlePulsNews() {

        var index = this.state.news.news_item.length;
        var news_item = this.state.news.news_item;
        var tpm = {
            title: "",
            author: "",
            content_source_url: "",
            content: "",
            digest: "",
            thumb_url: "",
        };
        news_item[index] = tpm;

        this.setState({
            news: Object.assign({}, {"news_item": news_item}),
            newsItemSelect: index,
            title: this.state.news.news_item[index].title,
            author: this.state.news.news_item[index].author,
            content_source_url: this.state.news.news_item[index].content_source_url,
            content: this.state.news.news_item[index].content.replace(/data-src/g, 'src'),
            digest: this.state.news.news_item[index].digest,
            thumb_url: this.state.news.news_item[index].thumb_url,
        })

        this.editorInstance.setContent("", "html");

    }

    /**
     * 编辑器更新时候的回调函数
     */
    receiveHtml(content) {

        var news_item = this.state.news.news_item;
        //获取当前操作的对象
        var editor = news_item[this.state.newsItemSelect];
        Object.assign(editor, {"content": content});

        news_item[this.state.newsItemSelect] = editor;

        this.setState({
            news: Object.assign({}, {"news_item": news_item})
        })
    }

    async handleSave() {
        const _id = this.props.match.params.id;
        const result = await WechatService.updateMaterial(_id, this.state.news);
        if (result.code == 20000) {
            message.success(result.message);
        } else {
            message.error(result.message);
        }
    }

    /**
     * 封面上传成功的回调函数
     * */
    handleThumbSuccess(response) {
        var news_item = this.state.news.news_item;
        //获取当前操作的对象
        var editor = news_item[this.state.newsItemSelect];
        Object.assign(editor, {"thumb_url": response.url});

        news_item[this.state.newsItemSelect] = editor;

        this.setState({
            news: Object.assign({}, {"news_item": news_item})
        })
    }

    render() {

        const editorProps = Config.getEditorConfig();

        return (
            <Card>
                <div className="news-tools">
                    <div className="news-items">
                        {
                            this.state.news.news_item.map((e, i) => {
                                return (
                                    <div
                                        className={i == this.state.newsItemSelect ? "news-item-select active" : "news-item-select"}
                                        key={i} onClick={this.handleNewsItemSelect.bind(this, i)}>
                                        <div className="cover" style={{backgroundImage: `url('${e.thumb_url}')`}}>
                                        </div>
                                        <div className="title">
                                            {e.title}
                                        </div>
                                    </div>
                                );
                            })
                        }

                        {
                            this.state.news.news_item.length < 11 ?
                                <div className="news-puls" onClick={this.handlePulsNews.bind(this)}>
                                    <i className="iconfont icon-add_light"></i>
                                </div>
                                : ""
                        }

                    </div>
                    <div className="news-content">

                        <div className="news-title">
                            <Form.Item label="文章标题">
                                <Input type="text" value={this.state.title}
                                       onChange={this.handleInputChange.bind(this, 'title')}/>
                            </Form.Item>

                            <Form.Item label="作者">
                                <Input type="text" value={this.state.author}
                                       onChange={this.handleInputChange.bind(this, 'author')}/>
                            </Form.Item>

                            <Form.Item label="内容摘要">

                                <Input.TextArea value={this.state.digest} autosize={{minRows: 2, maxRows: 6}}
                                                onChange={this.handleInputChange.bind(this, 'digest')}/>

                            </Form.Item>

                            <Form.Item label="内容">

                                <LzEditor
                                    ref={instance => this.editorInstance = instance}
                                    {...editorProps}
                                    onHTMLChange={(content) => {
                                        this.receiveHtml(content);
                                    }}
                                />

                            </Form.Item>

                            <Form.Item label="原文地址">
                                <Input type="text" value={this.state.content_source_url}
                                       onChange={this.handleInputChange.bind(this, 'content_source_url')}/>
                            </Form.Item>


                        </div>

                    </div>
                    <div className="news-material">

                        <Form.Item label={"封面"}>
                            <UploadThumb
                                imageUrl={this.state.thumb_url}
                                onSuccess={(result) => {
                                    this.handleThumbSuccess(result);
                                }}
                            />
                        </Form.Item>

                        <Button.Group>
                            <Button type="primary" onClick={this.handleSave.bind(this)}>保存</Button>
                            <Button type="danger">取消</Button>
                        </Button.Group>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter(Edtior);