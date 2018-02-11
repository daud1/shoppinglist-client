import React from 'react';
import { shallow, render, mount } from 'enzyme';
import DelButton from '../../components/generic/delButton.component';
import shallowToJson from 'enzyme-to-json';

describe ('DeleteButton Component', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<DelButton />);
        expect(wrapper.exists(<div></div>)).toBe(true)
    });

    it('matches snapshot', () => {
        const wrapper = shallow(<DelButton />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
})