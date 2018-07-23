import React from 'react'
import './main.css'

export const MarkerDetail = props => 
  <div className="marker-detail" 
    draggable="true"
    onDragEnd={props.dropCallback}
    onDragStart={props.dragCallback}
    onDragOver={props.overCallback}
    data-index={props.marker.index}>
    <div className='marker-detail-name'>{props.marker.name}</div>
    <div className='marker-detail-xy'>
      <div className='marker-detail-x'>X:{props.marker.lat}</div>
      <div className='marker-detail-y'>Y:{props.marker.lon}</div>
    </div>
    <input type="button" value="X" 
      className='marker-delete-button' 
      onClick={props.deleteCallback}/>
  </div>