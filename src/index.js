import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'

import { BrowserRouter as Router, Route, Link, IndexRoute } from 'react-router-dom';
import { Login } from './containers';

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>

                <hr />
                <Route exec path="/" component={App} />
                <Route path="/login" component={Login} />

            </div>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
