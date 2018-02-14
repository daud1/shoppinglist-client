import React from 'react';
import { shallow, render, mount } from 'enzyme';
import EditBtnMdl from '../../components/generic/editBtnMdl.component';
import shallowToJson from 'enzyme-to-json';

describe ('EditButtonModal Component', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<EditBtnMdl />);
        expect(wrapper.exists(<div></div>)).toBe(true);
    });

    it('matches snapshot', () => {
        const wrapper = shallow(<EditBtnMdl />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});