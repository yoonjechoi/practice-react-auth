import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
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