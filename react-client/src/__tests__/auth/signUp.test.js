import React from 'react';
import { shallow, render, mount } from 'enzyme';
import shallowToJson from 'enzyme-to-json';
import SignUp from '../../components/auth/signUp.component';


describe ('SignUp Component', () => {
    it('should render without crashing', () => {
        const wrapper = shallow(<SignUp />);
        expect(wrapper.exists(<div></div>)).toBe(true)
    });

    it('matches snapshot', () => {
        const wrapper = shallow(<SignUp />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
})