import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import LogIn from '../../components/auth/logIn.component';
import moxios from 'moxios';


describe ('LogIn Component', () => {
    it('should render without crashing', () => {
    const wrapper = shallow(<LogIn />);
        console.log(wrapper.debug());
        expect(wrapper.exists(<div></div>)).toBe(true)
    });

    

    it('matches snapshot', () => {
        const wrapper = shallow(<LogIn />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('handles successful axios calls properly', (done) => {
        const wrapper = shallow(<LogIn />);
        
        wrapper.find('TextField[name="email"]')
            .simulate("change", { target: { value: 'user@mail.com' }  });
        wrapper.find('TextField[name="password"]')
            .simulate("change", { target: { value: 'password' }  });

        wrapper.find('form')
            .simulate('submit', { preventDefault() {} });

        moxios.stubRequest('http://localhost:5000/auth/login', {
            status: 200,
            response: {
                'MSG': 'Successfully Logged In!',
                'token': 'random_hexalpha_string',
            }
        });
        
        moxios.wait(() => {
            expect(wrapper.html()).toContain('Successfully Logged In');
            done();
        });

    });
})