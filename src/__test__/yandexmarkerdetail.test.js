import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import React from 'react';
import { YandexMarkerDetail } from '../main/yandexmarkerdetail'

Enzyme.configure({ adapter: new Adapter() });

describe('YandexMarkerDetail', () => {
  const item = {
  	name: "1",
  	lat: 55.751404,
  	lon: 37.618897,
  	index: 1
  }

	it('YandexMarkerDetail renders without crashing', () => {
  	shallow(<YandexMarkerDetail marker={item} />);
	});
})