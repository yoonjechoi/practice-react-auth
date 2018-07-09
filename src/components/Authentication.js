import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class Authentication extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            email: "",
        }
    }

    render() {
        const { mode } = this.props

        const inputBoxes = (
            <div>
                <div className="input-field col s12 username">
                    <label>Username</label>
                    <input
                        name="username"
                        type="text"
                        className="validate"
                        value={this.state.username}
                        onChange={this.handleChange} />
                </div>
                <div className="input-field col s12">
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        className="validate"
                        value={this.state.password}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress} />
                </div>
            </div>
        );

        const loginView = (
            <div>
                <div className="card-content">
                    <div className="row">
                        {inputBoxes}
                        <a onClick={this.handleLogin} className="waves-effect waves-light btn">SUBMIT</a>
                    </div>
                </div>
                <div className="footer">
                    <div className="card-content">
                        <div className="right">
                            New Here? <Link to="/register">Create an account</Link>
                        </div>
                    </div>
                </div>
            </div>
        );

        const registerView = (
            <div className="card-content">
                <div className="row">
                    <div className="input-field col s12 username">
                        <label>Username</label>
                        <input
                            name="username"
                            type="text"
                            className="validate"
                            value={this.state.username}
                            onChange={this.handleChange} />
                    </div>

                    <div className="input-field col s12">
                        <label>Email</label>
                        <input
                            name="email"
                            type="email"
                            className="validate"
                            value={this.state.email}
                            onChange={this.handleChange} />
                    </div>

                    <div className="input-field col s12">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            className="validate"
                            value={this.state.password}
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeyPress} />
                    </div>
                    <a onClick={this.handleRegister} className="waves-effect waves-light btn">CREATE</a>
                </div>
            </div>
        );

        return (
            <div className="container auth">
                <Link className="logo" to="/">MemoPad</Link>
                <div className="card">
                    <div className="header blue white-text center">
                        <div className="card-content">{mode ? "Login" : "Register"}</div>
                    </div>
                    {mode ? loginView : registerView}
                </div>
            </div>
        );
    }

    handleChange = (e) => {
        let newState = {
            [e.target.name]: e.target.value
        }
        this.setState(newState);
    };

    handleKeyPress = (e) => {
        const { mode } = this.props;
        switch (e.charCode) {
            case 13:
                if (mode) {
                    this.handleLogin();
                } else {
                    this.handleRegister();
                }
            default:
                break;
        }
    };

    handleLogin = () => {
        const { onLogin } = this.props;

        const { username, password } = this.state;
        onLogin(username, password).then((success) => {
            if (!success) {
                this.setState({ password: '' });
            }
        });
    };

    handleRegister = () => {
        const { username, email, password } = this.state;
        const { onRegister } = this.props;

        onRegister(username, email, password).then((success) => {
            if (!success) {
                this.setState({ password: '' });
            }
        });
    };
}

Authentication.propTypes = {
    mode: PropTypes.bool,
    onLogin: PropTypes.func,
    onRegister: PropTypes.func,
};

Authentication.defaultProps = {
    mode: true,
    onLogin: (id, pw) => console.error("onLogin is not defined."),
    onRegister: (id, email, pw) => console.error("onRegister is not defined.")

}

export default Authentication;