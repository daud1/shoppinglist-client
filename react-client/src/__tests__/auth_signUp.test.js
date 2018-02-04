import React from 'react';
import { shallow, render, mount } from 'enzyme';

import SignUp from '../components/auth/signUp.component';


describe ('SignUp Component', () => {
    it('should render without crashing', () => {
        const wrapper = shallow(<SignUp />);
        expect(wrapper.exists(<div className='SignUp'></div>)).toBe(true)
    })
})