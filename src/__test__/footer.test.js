import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import React from 'react';

import { Footer } from '../footer/footer'

Enzyme.configure({ adapter: new Adapter() });

describe('Footer', () => {
	it('Footer renders without crashing', () => {
	    shallow(<Footer />);
	});

	it('Footer elements has class', () => {
	    const footer = shallow(<Footer />);
	    const len = footer.children().find('.footer-element').length;
	    expect(footer.children().length).toBe(len);
	});
});