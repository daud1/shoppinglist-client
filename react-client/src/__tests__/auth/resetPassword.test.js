import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ResetPassword from '../../components/auth/resetPassword.component';
import shallowToJson from 'enzyme-to-json';


describe ('ResetPassword Component', () => {
    it('should render without crashing', () => {
        const wrapper = shallow(<ResetPassword />);
        expect(wrapper.exists(<div></div>)).toBe(true);
    });

    it('matches snapshot', () => {
        const wrapper = shallow(<ResetPassword />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
})