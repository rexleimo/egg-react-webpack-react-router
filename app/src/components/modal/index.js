import React, {PureComponent} from 'react';

import {Card, Icon} from 'antd';

import './style.less';
/**
 * props 
 * @param boolean visible 是否可见
 * @param function onClose() 调用关闭的回调函数
 */
export default class Modal extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {

        const result = <div className="modal">

            <div className="modal-content">
                <Card
                    extra={(<Icon
                    className="modal-close"
                    type="close"
                    onClick={() => {
                    this
                        .props
                        .onClose()
                }}/>)}>
                    {this.props.children}
                </Card>
            </div>

        </div>;

        return (

            <div>
                {this.props.visible
                    ? result
                    : ""}
            </div>

        )
    }
}