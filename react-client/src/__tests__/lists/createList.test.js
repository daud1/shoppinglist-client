import React from 'react';
import {shallow, render, mount } from 'enzyme';
import shallowToJson from 'enzyme-to-json';
import CreateList from '../../components/lists/createList.component';

describe ('CreateList Form Component', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<CreateList />);
        expect(wrapper.exists(<div></div>)).toBe(true);
    });

    it('matches snapshot', () => {
        const wrapper = shallow(<CreateList />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
})