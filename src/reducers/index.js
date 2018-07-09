import { combineReducers } from 'redux';
import authentication from './authentication';
import memo from './memo';

const reducer = combineReducers({
    authentication, memo,
});
export default reducer;