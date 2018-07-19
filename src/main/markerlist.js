import React, { Component } from 'react';
import { YMaps, Map, Polyline } from 'react-yandex-maps';

import { MarkerDetail } from './markerdetail'
import { YandexMarkerDetail } from './yandexmarkerdetail'

import './main.css'

const mapState = { 
	center: [55.751404, 37.618897], 
	zoom: 15,
	width: 600,
	height: 600
};

class Markers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markersList: [],
  		mapCenter: [55.751404, 37.618897],
  		markerId: 0
    };

    this.handleDragOver = this.handleDragOver.bind(this)
    this.handleDragCallback = this.handleDragCallback.bind(this)
    this.handleDropCallback = this.handleDropCallback.bind(this)

    this.handleMoveCallback = this.handleMoveCallback.bind(this)

    this.onClickAddMarker = this.onClickAddMarker.bind(this)
    this.onBoundsChange = this.onBoundsChange.bind(this)
    this.handleDeleteCallback = this.handleDeleteCallback.bind(this)
  }

  onClickAddMarker (event) {
  	if(event.key === "Enter" && event.target.value !== "") {
	  	let {markersList, mapCenter, markerId} = this.state;
	  	let newMarker = [];

	  	newMarker['name'] = event.target.value;
	  	newMarker['lat'] = mapCenter[0].toFixed(6);
	  	newMarker['lon'] = mapCenter[1].toFixed(6);
	  	newMarker['index'] = markerId;

	  	markersList.push(newMarker);

	  	event.target.value = "";

	  	this.setState({
	  		markersList: markersList,
	  		markerId: markerId + 1
	  	})
  	}
  }

  onBoundsChange (event) {
	  const newCenter = event.originalEvent.newCenter;

  	this.setState({
  		mapCenter: newCenter
  	})
  }

  handleDeleteCallback (event) {
  	let { markersList } = this.state;
  	const index = 
  		markersList.findIndex(
  			marker => 
  				marker.index === 
  					Number(event.target.parentNode.getAttribute('data-index'))
  		);

		markersList.splice(index, 1);

  	this.setState({
  		markersList: markersList
  	})
  }

  handleMoveCallback (event) {
  	const index = event.originalEvent.target.options._options.index;
  	const coordinates = event.originalEvent.target.geometry._coordinates;
    let {markersList} = this.state;

    const itemIndex = markersList.findIndex(
    	marker => marker.index === index
    );

    markersList[itemIndex]['lat'] = coordinates[0].toFixed(6);
    markersList[itemIndex]['lon'] = coordinates[1].toFixed(6);

    this.setState({ 
    	markersList: markersList 
    });
  }

  handleDragCallback (event) {
    this.dragged = event.currentTarget;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', this.dragged);
  }

  handleDropCallback (event) {
    //this.dragged.style.display = "flex";
    this.over.style['border-top'] = ""
    this.over.style['border-bottom'] = ""

    let {markersList} = this.state;

    const from = markersList.findIndex(
    	marker => marker.index === Number(this.dragged.dataset.index)
    );
    let to = markersList.findIndex(
    	marker => marker.index === Number(this.over.dataset.index)
    );

    console.log(event.target.clientHeight / 2)
    console.log(event.nativeEvent.offsetY)

    if (from < to) to--;

    markersList.splice(to, 0, markersList.splice(from, 1)[0]);
    this.setState({ 
    	markersList: markersList 
    });
  }

  handleDragOver (event) {
    event.preventDefault();
    //this.dragged.style.display = "none";

    if (this.over !== undefined){
    	this.over.style['border-top'] = ""
    	this.over.style['border-bottom'] = ""
    }

    if (event.target.className === "") {
    	event.target = event.target.parentNode;
    }

    if (event.target.className === "marker-detail-xy" ||
        event.target.className === "marker-detail-name") {
    	event.target = event.target.parentNode;
    }

    if (event.nativeEvent.offsetY < (event.target.clientHeight / 1)){
    	event.target.style['border-top'] = "3px solid black"
    }
    else{
    	event.target.style['border-bottom'] = "3px solid black"
    }

    this.over = event.target;
  }

  render() {
  	const {markersList} = this.state;
  	const {width, height} = mapState;

    const geometry = {
  		coordinates: markersList.map((item, index) => {
	      return [Number(item.lat), Number(item.lon)]
	    })
  	}

    const options = {
      strokeColor: '#000000',
      strokeWidth: 2,
      strokeOpacity: 0.5
    }

    return (
<div className="main">
  <div className="markers">
  	<input type="text" 
  		name="markerName" 
  		className="input"
  		placeholder="Укажите наименование метки" 
  		onKeyPress={this.onClickAddMarker}/>
  	<div onDragOver={this.handleDragOver}>
	    {markersList.map((item, index) => {
	      return <MarkerDetail
	        marker={item}
	        key={`marker-list-key ${item.index}`}
	        deleteCallback={this.handleDeleteCallback}
	        dragCallback={this.handleDragCallback} 
	        dropCallback={this.handleDropCallback}  />
	    })}
  	</div>
  </div>
  <YMaps>
	  <Map 
	  	state={mapState} 
	  	width={width} 
	  	height={height} 
	  	onBoundsChange={this.onBoundsChange}>
	    {markersList.map((item, index) => {
	      return <YandexMarkerDetail
	        marker={item}
	        key={`marker-list-key ${item.index}`}
	        moveCallback={this.handleMoveCallback} />
	    })}
	    {markersList.length >= 2
	    ?
	    <Polyline 
	    	geometry={geometry}
	    	options={options} /> : ""
      }
	  </Map>
	 </YMaps>
</div>
	 )
	}
}

export default Markers;