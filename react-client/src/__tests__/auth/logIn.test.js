import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import LogIn from '../../components/auth/logIn.component';


describe ('LogIn Component', () => {
    it('should render without crashing', () => {
    const wrapper = shallow(<LogIn />);
        expect(wrapper.exists(<div></div>)).toBe(true)
    });

    it('matches snapshot', () => {
        const wrapper = shallow(<LogIn />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
})