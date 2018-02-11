import React from 'react';
import { shallow, render, mount } from 'enzyme';
import Search from '../../components/generic/search.component';
import shallowToJson from 'enzyme-to-json';

describe ('Search Component', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<Search />);
        expect(wrapper.exists(<div></div>)).toBe(true);
    });
    
    it('matches snapshot', () => {
        const wrapper = shallow(<Search />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
})