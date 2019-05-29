import React from "react";
import CourseForm from "./CourseForm";
import { shallow } from "enzyme";
import { isTSAnyKeyword } from "@babel/types";

function renderCourseForm(args) {
    const defaultProps = {
        authors: [],
        course: {},
        saving: false,
        error: {},
        onSave: ()=> {},
        onChange: () => {}
    }

    const props = {...defaultProps, ...args};
    return shallow(<CourseForm {...props}/>);
}

it("Renders form and heander", () => {
    const wrapper = renderCourseForm();
    expect(wrapper.find("form").length).toBe(1);
    expect(wrapper.find('h2').text()).toEqual("Add Course");
});

it("Should label save button as 'save' when not saving", () => {
    const wrapper = renderCourseForm();
    expect(wrapper.find("button").text()).toEqual("Save");
});

it("Should label save button as 'save' when not saving", () => {
    const wrapper = renderCourseForm({saving: true});
    expect(wrapper.find("button").text()).toEqual("Saving...");
});