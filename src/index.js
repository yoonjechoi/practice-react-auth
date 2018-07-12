import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';

import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import { Provider } from 'react-redux'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Login, Register, Home } from './containers';

const store = createStore(reducers, applyMiddleware(logger, thunk))

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </div>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
