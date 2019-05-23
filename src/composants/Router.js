import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Game from './Game';

import '../style.css'



class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="router">
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route exact path='/game' component={Game} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default Router;
