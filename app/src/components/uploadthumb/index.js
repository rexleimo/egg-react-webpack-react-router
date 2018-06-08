import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';

import './style.less';

import {Upload, Icon, message} from 'antd';

/**
 * 上传头像组件
 * @param onSuccess function 上传的回调函数
 * @param imageUrl string 上传头像默认值
 */
class UploadThumb extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imageUrl: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            imageUrl: nextProps.imageUrl
        })
    }

    handleChange(info) {
        const {imageUrl} = this.state;

        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({imageUrl, loading: false}));
            this.props.onSuccess(info.file.response);
        }
    }

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }

    render() {

        const uploadButton = (
            <div>
                <Icon
                    type={this.state.loading
                        ? 'loading'
                        : 'plus'}/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/upload"
                beforeUpload={this
                    .beforeUpload
                    .bind(this)}
                onChange={this
                    .handleChange
                    .bind(this)}>

                {this.state.imageUrl
                    ? <img src={this.state.imageUrl} alt="" style={{width: "100%"}}/>
                    : uploadButton}

            </Upload>
        );
    }
}

export default withRouter(UploadThumb);