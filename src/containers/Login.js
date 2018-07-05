import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Materialize from 'materialize-css';
import $ from 'jquery';

import Authentication from './components'

class Login extends Component {

  handleLogin = (id, pw) => {
    const { loginRequest, history } = this.props;

    loginRequest(id, pw).then(() => {
      if (this.props.status === "SUCCESS") {
        let loginData = {
          isLoggedIn: true,
          username: id
        };

        document.cookie = 'key=' + btoa(JSON.stringify(loginData));

        Materialize.toast(`Welcome ${id}!`, 2000);
        history.push('/');
        return true;
      } else {
        let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
        Materialize.toast($toastContent, 2000);
        return false;
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Hello, Login</h1>
        <Authentication mode={true} onLogin={this.handleLogin} />
      </div>
    );
  }
}

Login.propTypes = {

};

const mapStateToProps = (state) => {
  status: state.authentication.login.status
};

const mapDispatchToProps = (dispatch) => {
  loginRequest: (id, pw) => dispatch(loginRequest(id, pw))
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);