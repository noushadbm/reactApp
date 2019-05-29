import * as courseActions from './courseActions';
import * as types from './actionTypes';
import { courses } from '../../../tools/mockData';
//import fetchMock from 'fetch-mock';

describe("Async Actions", () => {
    afterEach(() => {
        
      });
      
    it("should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses", () => {

    });
});

describe("Create course success", () => {
    it("should create CREATE_COURSE_SUCCESS action", () => {
        //arrange
        const course = courses[0];
        const expectedAction = {
            type: types.CREATE_COURSE_SUCCESS,
            course
        };

        const action = courseActions.createCourseSuccess(course);

        // assert
        expect(action).toEqual(expectedAction);
    });
});