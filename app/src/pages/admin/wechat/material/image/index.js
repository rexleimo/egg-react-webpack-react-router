import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';

import {Button} from 'antd';

import axios from 'axios';

import "./style.less";

class ImageMaterial extends PureComponent {

    handleUpload() {
        this.refs.inputFile.click();
    }

    handleInputChangeUpload(event) {
        var target = event.target;
        var file = target.files[0];

        var formData = new FormData();
        formData.append('file', file);

        axios.post('/wechat/material/images/upload', formData).then((result) => {

        }).catch((err) => {

        });
    }

    render() {
        return (
            <div>

                <div className="material-hd-tools">
                    <div className="material-hd-tools-left">
                        大小不超过5M
                        <Button.Group style={{marginLeft: 15}}>
                            <Button onClick={this.handleUpload.bind(this)}>上传</Button>
                        </Button.Group>

                    </div>
                </div>


                <ul className="media-img-picker">
                    <li className="media-img-picker__item">
                        <i role="img" aria-describedby="图片描述" title="图片描述" className="media-img-picker__img-thumb"
                           style={{backgroundImage: `url('https://mmbiz.qpic.cn/mmbiz_jpg/gEBm6Eh965c6rI1eicKR5y7xZFJK8PlP8UGPBwIStPxUqdMJS8P2Q46xBZeyozbwJla1sh0fsxAwKqzEB13VOZw/0?wx_fmt=jpeg')`}}
                        >
                        </i>
                        <strong className="media-img-picker__img-title">
                            021-MACARON-table-light-by-Lucie-Koldova-Studio-960x719.jpg
                        </strong>
                    </li>
                </ul>
                图片素材库

                <input type="file" ref="inputFile" style={{opacity: 0}}
                       onChange={(e) => {
                           this.handleInputChangeUpload(e)
                       }}/>
            </div>
        );
    }
}

export default withRouter(ImageMaterial);