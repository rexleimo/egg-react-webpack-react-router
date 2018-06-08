export default class NewsConfig {
    static getEditorConfig() {
        return {
            height: 800,
            contentFormat: 'html',
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
        }
    }
}