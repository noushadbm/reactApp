import React from 'react';
import Header from './Header';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { isTSAnyKeyword, exportAllDeclaration } from '@babel/types';

it("contains 3 navLinks using shallow", () => {
    const numNavLinks = shallow(<Header/>).find("NavLink").length;
    expect(numNavLinks).toEqual(3);
});

it("contains anchor tags via mount", () => {
    const numNavLinks = mount(
        <MemoryRouter>
            <Header/>
        </MemoryRouter>
    ).find("a").length;

    expect(numNavLinks).toEqual(3);
});