import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from '../actions/authentication';

class App extends Component {
    render() {
        return (
            <div>
            </div>
        );
    }


    componentDidMount() {

        if ( !('auth' in localStorage) ) {
            return;
        }

        this.props.getStatusRequest().then(()=> {
            // TODO
            
        });


    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
