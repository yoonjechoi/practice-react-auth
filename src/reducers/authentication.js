import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    login: {
        status: 'INIT'
    },

    register: {
        status: 'INIT',
        error: -1,
    },

    status: {
        valid: false,
        isLoggedIn: false,
        currentUser: '',
    }
}

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case types.AUTH_LOGIN:
            return update(state, {
                login: {
                    status: { $set: 'WAITING' }
                }
            });

        case types.AUTH_LOGIN_SUCCESS:
            return update(state, {
                login: {
                    status: { $set: 'SUCCESS' }
                },

                status: {
                    isLoggedIn: { $set: true },
                    currentUser: { $set: action.username }
                }
            });
        case types.AUTH_LOGIN_FAILURE:
            return update(state, {
                login: {
                    status: { $set: 'FAILURE' }
                }
            });

        case types.AUTH_REGISTER:
            return update(state, {
                register: {
                    status: { $set: "WAITING" },
                    error: { $set: -1 }
                }
            });

        case types.AUTH_REGISTER_SUCCESS:
            return update(state, {
                register: {
                    status: { $set: "SUCCESS" },
                }
            });

        case types.AUTH_REGISTER_FAILURE:
            return update(state, {
                register: {
                    status: { $set: "FAILURE" },
                    error: { $set: action.errror }
                }
            });

        case types.AUTH_GET_STATUS:
            return state;

        case types.AUTH_GET_STATUS_SUCCESS:
            return update(state, {
                status: {
                    isLoggedIn: { $set: true },
                    valid: { $set: true },
                    currenctUser: { $set: action.username }
                }
            });

        case types.AUTH_GET_STATUS_FAILURE:
            return update(state, {
                status: {
                    valid: { $set: false },
                    isLoggedIn: { $set: false }
                }
            });

        /* logout */
        case types.AUTH_LOGOUT:
            return update(state, {
                status: {
                    isLoggedIn: { $set: false },
                    currenctUser: { $set: '' },
                }
            });

        default:
            return state
    }
}