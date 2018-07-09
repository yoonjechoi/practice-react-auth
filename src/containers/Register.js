import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { registerRequest } from '../actions/authentication';

class Register extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

Register.propTypes = {

};

const mapStatetoProps = (state) => {
    return {
        status: state.authentication.register.status,
        errorCode: state.authentication.register.error
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (id, pw) => {
            return dispatch(registerRequest(id, pw));
        },
    };
}

export default Register;