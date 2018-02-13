import React from 'react';
import {shallow, render, mount } from 'enzyme';
import CreateItem from '../../components/items/createItem.component';
import shallowToJson from 'enzyme-to-json';
import moxios from 'moxios';

describe ('CreateItem Form Component', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<CreateItem />);
        expect(wrapper.exists(<div></div>)).toBe(true);
    });

    it('matches snapshot', () => {
        const wrapper = shallow(<CreateItem />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('handles successful axios calls properly', (done) => {
        const wrapper = shallow(<CreateItem />);

        wrapper.find('input[name="name"]').simulate('change', { target: { value: 'newList' } });
        wrapper.find('form').simulate('submit', { preventDefault() {} });

        moxios.stubRequest('http://localhost:5000/shoppinglists/1/items/', {
            status: 201,
            'MSG': 'Item added!'
        });
        moxios.wait(() => {
            expect(wrapper.html()).toContain('Item added!');
            done();
        });
    });
})