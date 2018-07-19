import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import React from 'react';

import { Header } from '../header/header'

Enzyme.configure({ adapter: new Adapter() });

describe('Header', () => {
	it('Header renders without crashing', () => {
	    shallow(<Header />);
	});
});