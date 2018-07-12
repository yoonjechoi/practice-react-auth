import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from '../actions/authentication';
import { Header } from '../components';

class App extends Component {
    render() {


        return (
            <div>


            </div>
        );
    }
    
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        logoutRequest: () => {
            return dispatch(logoutRequest());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
