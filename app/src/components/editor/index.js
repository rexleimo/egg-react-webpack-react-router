import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css'

import './style.less';

class Editor extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            htmlConent: '',
            initialContent: '',
            edtiorOne: true
        }
    }

    componentWillReceiveProps(nextPopos) {
        if (this.state.edtiorOne && nextPopos.initialContent != "") {
            this.editorInstance.setContent(nextPopos.initialContent, "html");
            this.setState({ edtiorOne: false });
        }
    }

    handleHtmlChange(htmlConent) {
        this.setState({ initialContent: htmlConent });
        this.props.onChange(htmlConent);
    }

    render() {
        const editorProps = {
            contentId: this.props.contentId ? this.props.contentId : null,
            height: 800,
            contentFormat: 'html',
            initialContent: this.state.initialContent,
            onHTMLChange: this.handleHtmlChange.bind(this),
            media: {
                validateFn: (file) => {
                    return file.size < 1024 * 1024 * 2
                },
                uploadFn: (param) => {
                    const serverURL = '/upload'
                    const xhr = new XMLHttpRequest
                    const fd = new FormData()

                    const successFn = (response) => {
                        // 假设服务端直接返回文件上传后的地址
                        // 上传成功后调用param.success并传入上传后的文件地址
                        let responseText = xhr.responseText;
                        if (typeof responseText === "string") {
                            responseText = JSON.parse(responseText);
                        }
                        console.log(responseText);
                        param.success({
                            url: responseText.url
                        })
                    }

                    const progressFn = (event) => {
                        // 上传进度发生变化时调用param.progress
                        param.progress(event.loaded / event.total * 100)
                    }

                    const errorFn = (response) => {
                        // 上传发生错误时调用param.error
                        param.error({
                            msg: 'unable to upload.'
                        })
                    }

                    xhr.upload.addEventListener("progress", progressFn, false)
                    xhr.addEventListener("load", successFn, false)
                    xhr.addEventListener("error", errorFn, false)
                    xhr.addEventListener("abort", errorFn, false)

                    fd.append('file', param.file)
                    xhr.open('POST', serverURL, true)
                    xhr.send(fd)

                }

            }
        };

        return (<BraftEditor ref={instance => this.editorInstance = instance} {...editorProps} />);
    }
}

export default withRouter(Editor);