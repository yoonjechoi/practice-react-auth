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
            client_id: "3fd7IctD72gMax0KicX3vFm5RxBPaZwzcTDzIaZw",
            client_secret: "p6rAOtrdz1pYAw1lrJYor1Q1TfqDcJgeOIsIJQasVSM1waUhr37oDPzXuKsHpu9i0spM6U7aVKAnIacItPSmO5heezgp37vDzn4PJN5GT9ga1WZWOIwBqivrucs8zDKS",
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