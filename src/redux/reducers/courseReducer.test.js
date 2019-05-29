import courseReducer from './corseReducer';
import * as actions from "../actions/courseActions";

it("should add new course when passed CREATE_COURSE_SUCCESS", () => {
    const initialState = [
        {
            title: "A"
        },
        {
            title: "B"
        }
    ];

    const newCourse = {
        title: "C"
    }

    const action = actions.createCourseSuccess(newCourse);

    const newState = courseReducer(initialState, action);

    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual("A");
    expect(newState[1].title).toEqual("B");
    expect(newState[2].title).toEqual("C");
});
