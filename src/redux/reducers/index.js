import {combineReducers} from 'redux';
import courses from './corseReducer';
import authors from './authorReducer';
import apiCallsInProgress from './apiStatusReducer';

const rootReduser = combineReducers({
    courses: courses,
    authors: authors,
    apiCallsInProgress: apiCallsInProgress
});

export default rootReduser;