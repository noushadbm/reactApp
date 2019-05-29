import * as types from "./actionTypes";
import * as courseAPI from "../../api/courseApi";
import { begainApiCall, apiCallError } from "../actions/apiStatusActions";

// export function createCourse(course) {
//     return { type: types.CREATE_COURSE, course: course }
// }

export function loadCourseSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses: courses }
}

export function updateCourseSuccess(course) {
    return { type: types.UPDATE_COURSE_SUCCESS, course: course }
}

export function createCourseSuccess(course) {
    return { type: types.CREATE_COURSE_SUCCESS, course: course }
}

export function deleteCoureOptimistic(course){
    return { type: types.DELETE_COURSE_OPTIMISTIC, course: course }
}

export function loadCourses() {
    return function (dispatch) {  // dispatch is injected by thunk
        dispatch(begainApiCall());
        return courseAPI.getCourses()
            .then(courses => {
                //console.log(courses);
                dispatch(loadCourseSuccess(courses));
            }).catch(err => {
                dispatch(apiCallError(err));
                throw err;
            });

    }
}

export function saveCourse(course) {
    return function (dispatch) {  // dispatch is injected by thunk
        dispatch(begainApiCall());
        return courseAPI.saveCourse(course)
            .then(savedCourse => {
                //console.log(courses);
                course.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCourseSuccess(savedCourse));
            }).catch(err => {
                dispatch(apiCallError(err));
                throw err;
            });

    }
}

export function deleteCourse(course) {
    return function (dispatch) {
        dispatch(deleteCoureOptimistic(course));
        return courseAPI.deleteCourse(course.id);
    }
}
