import React from 'react';
import { shallow, render, mount } from 'enzyme';
import EditBtnMdl from '../../components/generic/editBtnMdl.component';
import { shallowToJson } from 'enzyme-to-json';
import moxios from 'moxios';

describe ('EditButtonModal Component', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<EditBtnMdl />);
        expect(wrapper.exists(<div></div>)).toBe(true);
    });

    it('matches snapshot', () => {
        const wrapper = shallow(<EditBtnMdl />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('handles successful axios calls properly', () => {
        const wrapper  = shallow(<EditBtnMdl />);

        wrapper.find("TextField[name='name']")
            .simulate('change', { target: { value: 'newName' }});
        wrapper.find('form').simulate('submit', { preventDefault () {} });
        moxios.stubRequest('http://localhost:5000/shoppinglists/1/items/', {
            status: 201,
            response: {
                'MSG': 'Item edited!'
            }
        });

        moxios.wait(() => {
            expect(wrapper.html()).toContain('Item edited!');
            done();
        });
    })
});