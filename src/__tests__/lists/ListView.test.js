import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ListView from '../../components/lists/listView.component';
import shallowToJson from 'enzyme-to-json';

describe ('ListView Component', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<ListView />);
        expect(wrapper.exists(<div></div>)).toBe(true)
    });

    it('matches snapshot', () => {
        const wrapper = shallow(<ListView />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
})