import React from 'react';
import { shallow, render, mount } from 'enzyme';
import shallowToJson from 'enzyme-to-json';
import moxios from 'moxios';

import ForgotPassword from '../../components/auth/forgotPassword.component';

describe ('ForgottenPassword Component', () => {
    it('should render without crashing', () => {
        const wrapper = shallow(<ForgotPassword />);
        expect(wrapper.exists(<div></div>)).toBe(true)
    });

    it('matches snapshot', () => {
        const wrapper = shallow(<ForgotPassword />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('handles successful axios calls properly', (done) => {
        const wrapper = shallow(<ForgotPassword />);

        wrapper.find('TextField[name="email"]').simulate('change', { target: { value: 'user@email.com' } });
        wrapper.find('form').simulate('submit', { preventDefault() {} });

        moxios.stubRequest('http://localhost:5000/auth/forgot-password', {
            status: 200,
            'MSG': 'Password reset link sent!'
        });
        moxios.wait(() => {
            expect(wrapper.html()).toContain('Password reset link sent!');
            done();
        });
    });
})