import React from 'react';
import {shallow, render, mount } from 'enzyme';
import CreateItem from '../../components/items/createItem.component';
import shallowToJson from 'enzyme-to-json';

describe ('CreateItem Form Component', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<CreateItem />);
        expect(wrapper.exists(<div></div>)).toBe(true);
    });

    it('matches snapshot', () => {
        const wrapper = shallow(<CreateItem />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
})