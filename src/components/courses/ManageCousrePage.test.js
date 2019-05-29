import React from 'react';
import { mount } from 'enzyme';
import { authors, newCourse ,courses } from '../../../tools/mockData';

import { ManageCoursePage } from './ManageCoursePage';

function render(args) {
    const defaultProps = {
        authors: authors,
        courses: courses,
        history: {},
        saveCourse: jest.fn(),
        loadAuthors: jest.fn(),
        loadCourses: jest.fn(),
        course: newCourse,
        match: {}
    }

    const props = {...defaultProps, ...args};
    return mount(<ManageCoursePage {...props}/>);
}

it("shows error while saving withour title", () => {
    const wrapper = render();
    wrapper.find("form").simulate("submit");
    const error = wrapper.find('.alert').first();
    expect(error.text()).toBe('Title is required');
});