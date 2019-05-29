import { createStore } from 'redux';
import rootReducer from './reducers';
import initialState from './reducers/initialState';
import * as courseActions from './actions/courseActions';

it("It should hanlde creating course", () => {
    // Given
    const store = createStore(rootReducer, initialState);
    const course = {
        title: "Clean code"
    };

    // When
     const action = courseActions.createCourseSuccess(course);
     store.dispatch(action);

     // Then
     const createdCouse = store.getState().courses[0];
     expect(createdCouse).toEqual(course);
});