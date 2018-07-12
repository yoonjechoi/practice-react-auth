import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_GET_STATUS,
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE,
    AUTH_LOGOUT
} from './ActionTypes';

import axios from 'axios';

/* ==== AUTH ===== */

/* LOGIN */

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    }
}


export function loginRequest(username, password) {
    return (dispatch) => {
        dispatch(login());

        const data = {
            client_id: "AbATJX3V319a2Jd09BWfPTj7wiUAZTNX6DEGZROW",
            client_secret: "9QtVJ6CcKb8zi4TfObBxWoy79ewobNwOFqZ1nKVuNSba6wyAIIK3epaqJNJ3N4ljD6Pg9jvcWevA58EkSKRH1TN7gZqzmejc3KXW2Do7z4JV103XdXDHgQf8Z2YSfDrT",
            grant_type: "password",
            username,
            password
        };

        return axios.post('http://localhost:8000/auth/token', data)
            .then((response) => {
                const authData = response.data;
                authData.username = username;
                localStorage.setItem('auth', btoa(JSON.stringify(authData)))

                dispatch(loginSuccess(username));
                return response.data;
            }).catch((error) => {
                dispatch(loginFailure());
            });
    }
}

/* REGISTER */

export function register() {
    return {
        type: AUTH_REGISTER
    };
}

export function registerRequest(username, email, password) {
    return (dispatch) => {
        //Inform register API is starting
        dispatch(register());

        const data = {
            username,
            email,
            password,
        };

        return axios.post('http://localhost:8000/accounts/register/', data)
            .then((response) => {
                dispatch(registerSuccess());
                return response.data;
            }).catch((error) => {
                dispatch(registerFailure(error.response.data))
            });
    };
}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS,
    };
}

export function registerFailure(error) {
    return {
        type: AUTH_REGISTER_FAILURE,
        error,
    };
}


/* GET STATUS */
export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}

export function getStatusSuccess(username) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        username
    };
}

export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}

export function getStatusRequest() {
    return (dispatch) => {
        dispatch(getStatus());

        if ('auth' in localStorage) {
            let authData = localStorage.getItem('auth');
            authData = JSON.parse(atob(authData));

            /*
             * TODO 
             * if access_token is not expired  
             */

            dispatch(getStatusSuccess(authData.username))

            /*
             * else 
             *  use refresh_token to refresh access_token
             * ans dispatch
             */

             /**
              * else 
              */
            return Promise.resolve(authData.username)
        } else {
            dispatch(getStatusFailure());
            return Promise.reject();
        }
    };
}

/* LOGOUT */
export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}

export function logoutRequest() {
    return (dispatch) => {
        dispatch(logout());
        
        let authData = localStorage.getItem('auth');
            authData = JSON.parse(atob(authData));
        
        const data = {
            client_id: "AbATJX3V319a2Jd09BWfPTj7wiUAZTNX6DEGZROW",
            client_secret: "9QtVJ6CcKb8zi4TfObBxWoy79ewobNwOFqZ1nKVuNSba6wyAIIK3epaqJNJ3N4ljD6Pg9jvcWevA58EkSKRH1TN7gZqzmejc3KXW2Do7z4JV103XdXDHgQf8Z2YSfDrT",
            token: authData.access_token
        };

        localStorage.removeItem('auth')

        return axios.post('http://localhost:8000/auth/revoke-token', data)
            .then((response) => {
                dispatch(logout());
            });
    };
}