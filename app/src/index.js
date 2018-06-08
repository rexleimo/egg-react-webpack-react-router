import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import Routers from './pages/router';

class Init extends Component {
    render() {
        return (
            <Routers />
        );
    }
}

ReactDOM.render(
    <Init />
    , document.getElementById('root')
);