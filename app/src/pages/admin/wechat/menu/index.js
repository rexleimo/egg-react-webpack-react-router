import React, { PureComponent } from 'react';

import { Card, Row, Col, Button, Icon, Form, Input, Radio, Modal } from 'antd';
import { withRouter } from 'react-router-dom';

import './style.less';
import moment from 'moment';
moment.locale('zh-cn');

import WechatService from 'services/wechat';

@Form.create()
class WechatMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            msgIndex: 0,            // 被选中的msg 下标
            msgType: "news",        // 图文 [news] 图片 [image]
            msgTypeIndex: 1,        //选择 [消息] [连接] [小程序]
            newsVisible: false,     //显示图文Modal
            newsLists: [],          //图文列表
            newsItemIndex: -1,      //图文被选中的下标
            selectNewsItem: {},     //图文被选中的对象
            selectMenuIndex: -1,    //选择的菜单下标,
            menu: { "menu": { "button": [{ "type": "click", "name": "今日歌曲", "key": "V1001_TODAY_MUSIC", "sub_button": [] }, { "name": "菜单", "sub_button": [{ "type": "view", "name": "搜索", "url": "http://molei.jihuiweb.com/user", "sub_button": [] }, { "type": "view", "name": "视频", "url": "http://v.qq.com/", "sub_button": [] }, { "type": "click", "name": "赞一下我们", "key": "V1001_GOOD", "sub_button": [] }] }] } },
            editorMenu: {}
        };
    }

    async componentWillMount() {
        let list = await WechatService.getMaterials('news', 1, 10);
        this.setState({
            newsLists: list
        });
    }

    handleWeChatMsgIndex(index) {
        this.setState({
            msgIndex: index
        });
    }

    handleWeChatMsgTypeIndex(type) {
        this.setState({
            msgType: type
        });
    }

    handleWechatMsgSelectIndex(index) {
        this.setState({
            newsItemIndex: index
        })
    }
    /**
     * 编辑菜单
     * @param index 一级菜单下标
     * @param subIndex 二级菜单下标 如果没有为undefind
     */
    handleEditorMenu(index, subIndex) {
        const menu = this.state.menu;
        if (subIndex == undefined) {
            let editor = menu.menu.button[index];
        } else {
            let editor = menu.menu.button[index].sub_button[subIndex];
        }

        const msgTypeArr = ["view_limited", "media_id"];

        this.setState({
            editorMenu: editor
        });
    }

    render() {

        const menu = this.state.menu;

        return (
            <Card title="微信菜单">
                <div className="flex">
                    <div className="flex-1">

                        <div className="wechat-box">

                            <div className="wechat-menu flex">

                                {
                                    menu.menu.button.map((val, i) => {
                                        return (
                                            <div className="flex-1 wechat-menu-itme" key={i} onClick={
                                                this.handleEditorMenu.bind(this, i, undefined)
                                            }>
                                                {val.name}
                                                {val.sub_button.length > 0 ?
                                                    <div className="wechat-menu-sub">
                                                        {val.sub_button.length < 5 ? <div className="wechat-menu-sub-btn"><Icon type="plus" /></div> : ""}
                                                        {val.sub_button.map((el, k) => {
                                                            return (
                                                                <div className="wechat-menu-sub-btn" key={k} onClick={
                                                                    this.handleEditorMenu.bind(this, i, k)
                                                                }>{el.name}</div>
                                                            )
                                                        })}
                                                    </div>
                                                    : ""}
                                            </div>
                                        )
                                    })
                                }

                                {menu.menu.button.length < 3 ?
                                    <div className="flex-1 wechat-menu-itme">
                                        <Icon type="plus" />
                                    </div>
                                    :
                                    ""
                                }

                            </div>

                        </div>

                    </div>
                    <div className="flex-3">

                        <Button.Group>
                            <Button type="danger">删除此菜单</Button>
                        </Button.Group>


                        <Form>
                            <Form.Item label="菜单名称">
                                <Input type="text" value={this.state.editorMenu.name} onChange={(e) => {
                                    let target = e.target;
                                    this.setState({
                                        editorMenu: Object.assign({}, { "name": target.value })
                                    });
                                }} />
                            </Form.Item>

                            <Form.Item label="菜单内容">
                                <Radio.Group value={this.state.msgTypeIndex} onChange={(e) => {
                                    this.setState({
                                        msgTypeIndex: e.target.value
                                    })
                                }}>
                                    <Radio value={1} onClick={this.handleWeChatMsgTypeIndex.bind(this, "news")}>发送消息</Radio>
                                    <Radio value={2} onClick={this.handleWeChatMsgTypeIndex.bind(this, "view")}>跳转页面</Radio>
                                    <Radio value={3} onClick={this.handleWeChatMsgTypeIndex.bind(this, "miniprogram")}>跳转小程序</Radio>
                                </Radio.Group>


                                <div className={this.state.msgType == "news" ? "wechat-menu-content active" : "wechat-menu-content"}>
                                    <div className="wechat-menu-hd">
                                        <div className={this.state.msgIndex == 0 ? "wechat-menu-tool active" : "wechat-menu-tool"} onClick={this.handleWeChatMsgIndex.bind(this, 0)}>
                                            <i className="iconfont icon-tuwen"></i>
                                            图文消息
                                        </div>

                                        <div className={this.state.msgIndex == 1 ? "wechat-menu-tool active" : "wechat-menu-tool"} onClick={this.handleWeChatMsgIndex.bind(this, 1)}>
                                            <i className="iconfont icon-piclight"></i>
                                            图片
                                        </div>

                                        <div className={this.state.msgIndex == 2 ? "wechat-menu-tool active" : "wechat-menu-tool"} onClick={this.handleWeChatMsgIndex.bind(this, 2)}>
                                            <i className="iconfont icon-voice"></i>
                                            录音
                                        </div>

                                        <div className={this.state.msgIndex == 3 ? "wechat-menu-tool active" : "wechat-menu-tool"} onClick={this.handleWeChatMsgIndex.bind(this, 3)}>
                                            <i className="iconfont icon-recordlight"></i>
                                            视频
                                        </div>
                                    </div>
                                    <div className="wechat-menu-bd">
                                        {
                                            this.state.selectNewsItem.media_id != undefined ?
                                                <div className="wechat-media-select-tools wechat-modal-meterials">
                                                    <div class="wechat-modal-meterials-col">
                                                        <div class="wechat-news-update-time">
                                                            更新于：<time>{moment.unix(this.state.selectNewsItem.update_time).format('YYYY-MM-DD')}</time>
                                                            <hr />
                                                        </div>
                                                        {this.state.selectNewsItem.content.news_item.map((val, k) => {
                                                            return (
                                                                <div className={k == 0 ? "preview_mask" : "card_appmsg"} key={k}>
                                                                    <div class="card_appmsg_title">
                                                                        {val.title}
                                                                    </div>
                                                                    <div class="card_appmsg-thumb">
                                                                        <div class="card_appimg" style={{ backgroundImage: 'url(http://localhost:8000/wechat/get?url=' + val.thumb_url + ')' }}></div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    <a style={{ verticalAlign: "bottom", marginLeft: 10 }} onClick={() => {
                                                        this.setState({
                                                            selectNewsItem: {}
                                                        })
                                                    }}>删除</a>
                                                </div>
                                                :
                                                <div className="wechat-media-tools">
                                                    <div className="item" onClick={() => {
                                                        this.setState({
                                                            newsVisible: true
                                                        })
                                                    }}>
                                                        <Icon type="folder-add" />
                                                        从素材库选择
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </div>

                                <div className={this.state.msgType == "view" ? "wechat-menu-content wechat-menu-view active" : "wechat-menu-content wechat-menu-view"}>

                                    <div className="wechat-menu-bd">
                                        <Form.Item label="页面地址">
                                            <Input />
                                        </Form.Item>
                                    </div>

                                </div>

                            </Form.Item>
                        </Form>

                        <Modal
                            title="图文素材库"
                            visible={this.state.newsVisible}
                            width={800}
                            style={{ top: 100 }}
                            onCancel={() => {
                                this.setState({
                                    newsVisible: false
                                })
                            }}
                            onOk={() => {
                                this.setState({
                                    selectNewsItem: this.state.newsLists[this.state.newsItemIndex],
                                    newsVisible: false
                                })
                            }}
                        >

                            <div class="wechat-tool-box">
                                <div class="wechat-tool-search">

                                </div>
                                <div class="wechat-tool-btn-group"></div>
                            </div>

                            <div class="wechat-modal-meterials">

                                {this.state.newsLists.map((el, i) => {
                                    return (
                                        <div class="wechat-modal-meterials-col" key={i}>
                                            <div class="wechat-news-update-time">
                                                更新于：<time>{moment.unix(el.update_time).format('YYYY-MM-DD')}</time>
                                                <hr />
                                            </div>
                                            {el.content.news_item.map((val, k) => {
                                                return (
                                                    <div className={k == 0 ? "preview_mask" : "card_appmsg"} key={k}>
                                                        <div class="card_appmsg_title">
                                                            {val.title}
                                                        </div>
                                                        <div class="card_appmsg-thumb">
                                                            <div class="card_appimg" style={{ backgroundImage: 'url(http://localhost:8000/wechat/get?url=' + val.thumb_url + ')' }}></div>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            <div className={i == this.state.newsItemIndex ? "mask active-op" : "mask"} onClick={this.handleWechatMsgSelectIndex.bind(this, i)}>
                                                <div class="mask-content">
                                                    <i class="iconfont icon-check"></i>
                                                    <p>选中</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>


                        </Modal>


                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(WechatMenu);