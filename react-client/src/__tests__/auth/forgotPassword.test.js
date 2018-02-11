import React from 'react';
import { shallow, render, mount } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

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
})