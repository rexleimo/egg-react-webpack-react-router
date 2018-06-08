import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import { Card, Tag } from 'antd';
import TagCompoents from 'component/tags';

import './style.less';

import Image from './image';
import News from './news';
import Video from './video';
import Voice from './voice';

class MeterialIndex extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            type: "news"
        }
    }

    render() {
        return (
            <div>
                <Card
                    title="素材管理"
                >

                    <TagCompoents data={
                        [
                            { type: "news", name: "图文消息" },
                            { type: "image", name: "图片" },
                            { type: "voice", name: "语音" },
                            { type: "video", name: "视频" },
                        ]
                    } onClick={(type) => {
                        this.setState({
                            type: type
                        })
                    }} />

                    <div className="material-content">
                        {(() => {
                            switch (this.state.type) {
                                case "news": return <News />; break;
                                case "image": return <Image />; break;
                                case "voice": return <Voice />; break;
                                case "video": return <Video />; break;
                            }
                        })()}
                    </div>


                </Card>
            </div>
        );
    }
}

export default withRouter(MeterialIndex)