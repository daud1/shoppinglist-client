import React from 'react';
import { shallow, render, mount } from 'enzyme';
import shallowToJson from 'enzyme-to-json';
import SignUp from '../../components/auth/signUp.component';
import moxios from 'moxios';


describe ('SignUp Component', () => {
    it('should render without crashing', () => {
        const wrapper = shallow(<SignUp />);
        expect(wrapper.exists(<div></div>)).toBe(true)
    });

    it('matches snapshot', () => {
        const wrapper = shallow(<SignUp />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('handles successful axios calls properly', (done) => {
        const wrapper = shallow(<SignUp />);

        wrapper.find('TextField[name="email"]').simulate('change', { target: { value: 'user@email.com' } });
        wrapper.find('TextField[name="password"]').simulate('change', { target: { value: 'password' } });
        wrapper.find('TextField[name="confirm"]').simulate('change', { target: { value: 'password' } });
        wrapper.find('form').simulate('submit', { preventDefault() {} });
        
        moxios.stubRequest('http://localhost:5000/auth/register', {
            status: 201,
            response: {
                'MSG': 'User successfully created!',
            }

        });
        moxios.wait(() => {
            expect(wrapper.html()).toContain('Registered!');
            done();
        });
    });
})