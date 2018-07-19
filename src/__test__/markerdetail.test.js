import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import React from 'react';

import { MarkerDetail } from '../main/markerdetail'
import Markers from '../main/markerlist'

Enzyme.configure({ adapter: new Adapter() });

describe('MarkerDetail', () => {
	let markerDetail;
  const item = {
  	name: "1",
  	lat: 55.751404,
  	lon: 37.618897,
  	index: 1
  }

  beforeEach(() => {
    markerDetail = mount(<MarkerDetail marker={item} />);
  });

	it('MarkerDetail renders without crashing', () => {
    expect(markerDetail.length).toBe(1);
	});

  it('Props are right', () => {
  	expect(markerDetail.prop('marker').name).toBeTruthy();
  	expect(markerDetail.prop('marker').lat).toBeTruthy();
  	expect(markerDetail.prop('marker').lon).toBeTruthy();
  	expect(markerDetail.prop('marker').index).toBeTruthy();
	})

  it('Should be draggable', () => {
  	const mD = markerDetail.find('div').first();
		expect(mD.prop('draggable')).toBeTruthy();
	})
});

describe('MarkerDetail drag-drop', () => {
  const item = {
    name: "1",
    lat: 55.751404,
    lon: 37.618897,
    index: 1
  }
  it('should fire dragDrop events', () => {
    const spydrop = jest.fn();
    const spydrag = jest.fn();
    const ml = 
      shallow(
        <MarkerDetail 
          marker={item} 
          dragCallback={spydrag} 
          dropCallback={spydrop} />
      );
    ml.simulate('DragStart');
    ml.simulate('DragEnd');
    expect(spydrag).toHaveBeenCalled();
    expect(spydrop).toHaveBeenCalled();
  });
});