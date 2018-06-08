import React, {PureComponent} from 'react';
import {withRouter, Link} from 'react-router-dom';

import {Icon, Button, Input,message} from 'antd';

import Masonry from 'react-masonry-component';

import './style.less';

import WechatService from 'services/wechat';

class NewsMaterial extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    async componentWillMount() {
        let list = await WechatService.getMaterials('news', 1, 10);
        this.setState({
            list: list
        })
    }

    async handleDeleteMaterial(_id) {
        
        console.log(_id);
    }

    render() {
        return (
            <div className="material-content">

                <div className="material-hd-tools">
                    <div className="material-hd-tools-left">
                        <Button.Group>
                            <Button onClick={() => {
                                window.location.href = "/admin/wechat/material/news/add";
                            }}>新增图文</Button>
                        </Button.Group>
                        <div className="material-hd-tools-search">
                            <input className=""/>
                            <Button className="material-hd-tools-search-btn">
                                <Icon type="search"/>
                            </Button>
                        </div>
                    </div>


                </div>

                <Masonry>
                    {this.state.list.map((e, i) => {
                        return (
                            <div className="material-news-item" key={i}>
                                <div className="material-news-bd">
                                    {
                                        e.news_item.map((v, k) => {
                                            return (
                                                k == 0 ?
                                                    <div className="material-cover" key={k}>
                                                        <div className="cover"
                                                             style={{backgroundImage: `url('${v.thumb_url}')`}}>

                                                        </div>
                                                        <div className="title">
                                                            {v.title}
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="material-sub" key={k}>
                                                        <div className="title">
                                                            {v.title}
                                                        </div>
                                                        <div className="cover"
                                                             style={{backgroundImage: `url('${v.thumb_url}')`}}>

                                                        </div>
                                                    </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="material-news-ft">
                                    <div className="material-news-ft-left">
                                        更新时间：{e.update_time}
                                    </div>
                                    <div className="material-news-ft-right">
                                        <Link to={`/admin/wechat/material/news/${e._id}/ediotr`}>
                                            <Icon type="edit"/>
                                        </Link>
                                        <Icon type="delete" onClick={this.handleDeleteMaterial.bind(this, e._id)}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Masonry>
            </div>
        );
    }
}

export default withRouter(NewsMaterial);