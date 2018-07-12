import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from '../actions/authentication';

import Materialize from 'materialize-css';

class Header extends Component {
    componentDidMount() {

        if (!('auth' in localStorage)) {
            return;
        }

        this.props.getStatusRequest().then(() => {
            // TODO

        });


    }
    render() {
        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);

        if (isAuth) {
            return (null);
        }

        const loginButton = (
            <li>
                <Link to="/login" push><i className="material-icons">vpn_key</i>Login</Link>
            </li>
        );

        const logoutButton = (
            <li>
                <a onClick={this.handleLogout}><i className="material-icons">lock_open</i>Logout</a>
            </li>
        );

        return (
            <div>
                <nav>
                    <div className="nav-wrapper blue darken-1">
                        <Link to="/" className="brand-logo center">Memo Pad</Link>

                        <ul>
                            <li><a><i className="material-icons">search</i></a></li>
                        </ul>

                        <div className="right">
                            <ul>
                                {this.props.status.isLoggedIn ? logoutButton : loginButton}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }

    handleLogout = () => {
        return this.props.logoutRequest().then(
            () => {
                Materialize.toast('Good Bye', 2000);
                
            }
        );
    };
}


Header.propTypes = {
    usernames: PropTypes.array,
};


const mapStateToProps = (state) => {
    return {
        status: state.authentication.status,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));