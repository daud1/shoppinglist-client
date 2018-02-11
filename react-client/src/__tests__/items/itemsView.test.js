import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ItemsView from '../../components/items/itemsView.component';
import shallowToJson from 'enzyme-to-json';

describe ('ItemView Component', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<ItemsView />);
        expect(wrapper.exists(<div></div>)).toBe(true)
    });

    it('matches snapshot', () => {
        const wrapper = shallow(<ItemsView />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
})