import React from 'react';
import {shallow, render, mount } from 'enzyme';
import shallowToJson from 'enzyme-to-json';
import CreateList from '../../components/lists/createList.component';
import moxios from 'moxios';

describe ('CreateList Form Component', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<CreateList />);
        expect(wrapper.exists(<div></div>)).toBe(true);
    });

    it('matches snapshot', () => {
        const wrapper = shallow(<CreateList />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('handles successful axios calls properly', (done) => {
        const wrapper = shallow(<CreateList />);

        wrapper.find('input[name="name"]').simulate('change', { target: { value: 'newList' } });
        wrapper.find('form').simulate('submit', { preventDefault() {} });

        moxios.stubRequest('http://localhost:5000/shoppinglists/', {
            status: 201,
            'MSG': 'List created!'
        });
        moxios.wait(() => {
            expect(wrapper.html()).toContain('List created!');
            done();
        });
    });
})