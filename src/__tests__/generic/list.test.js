import React from 'react';
import { shallow, render, mount } from 'enzyme';
import Lister from '../../components/generic/list.component';
import shallowToJson from 'enzyme-to-json';

describe ('Lister Component', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<Lister />);
        expect(wrapper.exists(<div></div>)).toBe(true);
    });

    it('matches snapshot', () => {
        const wrapper = shallow(<Lister />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});