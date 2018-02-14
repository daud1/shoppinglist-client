import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ResetPassword from '../../components/auth/resetPassword.component';
import shallowToJson from 'enzyme-to-json';
import moxios from 'moxios';


describe ('ResetPassword Component', () => {
    it('should render without crashing', () => {
        const wrapper = shallow(<ResetPassword />);
        expect(wrapper.exists(<div></div>)).toBe(true);
    });

    it('matches snapshot', () => {
        const wrapper = shallow(<ResetPassword />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('handles successful axios calls properly', (done) => {
        const wrapper = shallow(<ResetPassword />);

        wrapper.find('input[name="new_password"]').simulate('change', { target: { value: 'pswd' } });
        wrapper.find('input[name="confirm"]').simulate('change', { target: { value: 'pswd' } });
        wrapper.find('form').simulate('submit', {preventDefault() {} });

        moxios.stubRequest('http://localhost:5000/auth/reset-password', {
            status: 200,
            'MSG': 'Password successfully reset!'
        });
        moxios.wait(() => {
            expect(wrapper.html()).toContain('Password successfully reset!');
            done();
        });
    });
})