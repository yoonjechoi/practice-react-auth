import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { registerRequest } from '../actions/authentication';
import { connect } from 'react-redux';
import { Authentication } from '../components';
import Materialize from 'materialize-css';
import $ from 'jquery';


class Register extends Component {
    render() {
        return (
            <div>
                <Authentication mode={false} onRegister={this.handleRegister} />
            </div>
        );
    }

    handleRegister = (username, email, password) => {
        const { registerRequest, errorCode, history } = this.props;

        return registerRequest(username, email, password).then(
            () => {

                if (this.props.status === "SUCCESS") {
                    Materialize.toast("Success! Please log in", 2000);
                    history.push("/login");
                    return true;
                } else {
                    /*
                       ERROR CODES:
                           1: BAD USERNAME
                           2: BAD PASSWORD
                           3: USERNAME EXISTS
                   */
                    let errorMessage = [
                        'Invalid Username',
                        'Password is too short',
                        'Username already exists'
                    ];

                    let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[errorCode - 1] + '</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    };
}

Register.propTypes = {
    status: PropTypes.string.isRequired,
    errorCode: PropTypes.number,
    registerRequest: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => {
    return {
        status: state.authentication.register.status,
        errorCode: state.authentication.register.error
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (id, email, pw) => {
            return dispatch(registerRequest(id, email, pw));
        },
    };
}

export default Register = connect(mapStatetoProps, mapDispatchToProps)(Register);