import {
    MEMO_POST,
    MEMO_POST_SUCCESS,
    MEMO_POST_FAILURE,
    MEMO_LIST,
    MEMO_LIST_SUCCESS,
    MEMO_LIST_FAILURE,
    MEMO_EDIT,
    MEMO_EDIT_SUCCESS,
    MEMO_EDIT_FAILURE,
    MEMO_REMOVE,
    MEMO_REMOVE_SUCCESS,
    MEMO_REMOVE_FAILURE,
    MEMO_STAR,
    MEMO_STAR_SUCCESS,
    MEMO_STAR_FAILURE
} from './ActionTypes';

import axios from 'axios';

/* MEMO POST */
export function memoPost() {
    return {
        type: MEMO_POST
    };
}

export function memoPostSuccess() {
    return {
        type: MEMO_POST_SUCCESS
    };
}

export function memoPostFailure(error) {
    return {
        type: MEMO_POST_FAILURE,
        error,
    };
}

export function memoPostRequest(contents) {
    return (dispatch) => {
        dispatch(memoPost());

        return axios.post('http://localhost:8000/api/memo', { contents })
            .then((response) => {
                dispatch(memoPostSuccess());
            }).catch((error) => {
                dispatch(memoPostFailure(error.response.data))
            });
    };
}


/* MEMO LIST */

export function memoList() {
    return {
        type: MEMO_LIST
    };
}

export function memoListSuccess(data, isInitial, listType) {
    return {
        type: MEMO_LIST_SUCCESS,
        data,
        isInitial,
        listType,
    };
}

export function memoListFailure(error) {
    return {
        type: MEMO_LIST_FAILURE,
        error,
    };
}


/*

    Parameter:
        - isInitial: whether it is for initial loading
        - listType:  OPTIONAL; loading 'old' memo or 'new' memo
        - id:        OPTIONAL; memo id (one at the bottom or one at the top)
        - username:  OPTIONAL; find memos of following user
*/

export function memoListRequest(isInitial, listType, id, username) {
    return (dispatch) => {
        dispatch(memoList());

        let url = "http://localhost:8000/api/memo";

        if (typeof username !== "undefined") {
            url = `${url}/${username}/`;
        }

        if (!isInitial) {
            url = `${url}?${listType}=${id}`;
        }
        
        console.log(url);
        
        return axios.get(url)
            .then((response) => {
                console.log(response.data);
                dispatch(memoListSuccess(response.data, isInitial, listType));
            }).catch((error) => {
                dispatch(memoListFailure(error.response.data))
            });
    };
}
