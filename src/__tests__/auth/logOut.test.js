import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import LogOutwithRouter, { LogOut } from '../../components/auth/logOut.component';
import moxios from 'moxios';


describe ('LogOut Component', () => {
    it('should render without crashing', () => {
        const wrapper = shallow(<LogOutwithRouter />);
        expect(wrapper.exists(<button></button>)).toBe(true)
    });
    
    it('matches snapshot', () => {
        const wrapper = shallow(<LogOutwithRouter />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('handles successful axios calls properly', (done) => {
        const wrapper = shallow(<LogOut />);
        // wrapp = wrapper.find('button');
        console.log(wrapper.debug());
        // wrapper.find("button").simulate('click', { preventDefault () {} });

        moxios.stubRequest('http://localhost:5000/auth/logout', {
            status: 200,
            response: {
                'MSG': 'Successfully Logged Out!',
            }
        });
        
        moxios.wait(() => {
            expect(wrapper.html()).toContain('Successfully Logged Out');
            done();
        });
    });
})