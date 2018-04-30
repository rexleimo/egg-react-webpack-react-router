import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {Route, BrowserRouter as Router, Link} from 'react-router-dom';

import Index from "./pages/Index";
import List from "./pages/List";


class Init extends Component {
    render() {
        return (

            <Router>
                <div>
                    <Link to={`/list`}>List</Link>
                    <Route exact path="/" component={Index}/>
                    <Route path="/list" component={List}/>
                </div>
            </Router>

        );
    }
}

ReactDOM.render(
    <Init/>
    , document.getElementById('root')
);