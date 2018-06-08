import React, { PureComponent } from 'react';
import { withRouter, Link, Route, Switch } from 'react-router-dom';

import './style.less';
import { STATUS_CODES } from 'http';

class TagCompoents extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            tagLinkBarStyle: {},
            tagActiveIndex: 0
        }
    }

    componentDidMount() {
        var item = document.querySelector('.tag-item');
        var width = item.offsetWidth;

        var tmp = {
            width: width,
            transform: 'translate3d(0px, 0px, 0px)'
        };

        this.setState({
            tagLinkBarStyle: tmp
        });
    }

    handleTagClick(e) {
        var target = e.target;
        var width = target.offsetWidth;
        var left = target.offsetLeft;
        var index = target.getAttribute('data-index');
        var type = target.getAttribute('data-type');

        var tmp = {
            width: width,
            transform: `translate3d(${left}px, 0px, 0px)`
        };

        this.setState({
            tagLinkBarStyle: tmp,
            tagActiveIndex: index
        });

        this.props.onClick(type);
    }

    render() {
        return (
            <div>
                <div className="tag-group">
                    {this.props.data.map((e, i) => {
                        return (
                            <div className={this.state.tagActiveIndex == i ? "tag-item active" : "tag-item"} onClick={this.handleTagClick.bind(this)} key={i} data-index={i} data-type={e.type}>
                                {e.name}
                            </div>
                        )
                    })}

                    <div className="tag-link-bar" style={this.state.tagLinkBarStyle}></div>
                </div>
            </div>
        );
    }
}

export default withRouter(TagCompoents);