import React, { Component } from 'react';
import CatBrowser from './cats/cat_browser';
import CatDetail from './cats/cat_detail';
import { Switch, Route, withRouter } from 'react-router-dom';


class Body extends Component {
    
    render() {
        return(
            <div>
                <Switch>
                    <Route exact path="/" component={CatBrowser} />
                    <Route path="/:id" component={CatDetail} />
                </Switch>
            </div>
        )
    }
    }

export default withRouter(Body);