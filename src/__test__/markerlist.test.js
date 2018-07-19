import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import React from 'react';

import Markers from '../main/markerlist'

Enzyme.configure({ adapter: new Adapter() });

describe('MarkerList', () => {
	it('MarkerList renders without crashing', () => {
	    shallow(<Markers />);
	});

  it('should add new item if ENTER and name exists', () => {
    const event = {
    	key: "Enter", 
    	target: {
    		value: "1"
    	}
  	}
    const markerlist = shallow(<Markers />);

    markerlist.find('input').simulate('KeyPress', event);

    expect(markerlist.state('markersList').length).toBe(1);
    expect(markerlist.state('markerId')).toBe(1);
    expect(event.value).toBe();

    markerlist.find('input').simulate('KeyPress', event);
    expect(markerlist.state('markersList').length).toBe(1);
  });

  it('should delete item', () => {
    const event = {
    	key: "Enter", 
    	target: {
    		value: "1"
    	}
  	}
    const markerlist = shallow(<Markers />);

    markerlist.instance().handleDeleteCallback(
    	{target:{parentNode:{getAttribute: (e) => {return 0}}}}
    )
    expect(markerlist.state('markersList').length).toBe(0);
  });

  it('should fire dragOver events', () => {
    const spy = 
    	jest.spyOn(Markers.prototype, 'handleDragOver').
    		mockImplementation(() => Promise.resolve())
    const ml = shallow(<Markers />);

    ml.find('.markers').children().find('div').first().simulate('DragOver');
		expect(spy).toHaveBeenCalled();
  });

  it('should delete item', () => {
    const ml = shallow(<Markers />);

    ml.instance().onBoundsChange({originalEvent:{newCenter: [0, 0]}})
    expect(ml.state('mapCenter')[0]).toBe(0);
    expect(ml.state('mapCenter')[1]).toBe(0);
  });
});