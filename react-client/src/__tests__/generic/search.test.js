import React from 'react';
import { shallow, render, mount } from 'enzyme';
import Search from '../../components/generic/search.component';
import shallowToJson from 'enzyme-to-json';
import moxios from 'moxios';

describe ('Search Component', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<Search />);
        expect(wrapper.exists(<div></div>)).toBe(true);
    });
    
    it('matches snapshot', () => {
        const wrapper = shallow(<Search />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('handles successful axios calls properly', (done) => {
        const wrapper = shallow(<Search />);

        wrapper.find('input[name="q"]').simulate('change', { target: { value: 'l' } });
        wrapper.find('form').simulate('submit', {preventDefault() {} });

        moxios.stubRequest('http://localhost:5000/shoppinglists/?q=l', {
            status: 200,
            'MSG': 'Success!'
        });
        moxios.wait(() => {
            expect(wrapper.html()).toContain('Success!');
            done();
        });
    });
})