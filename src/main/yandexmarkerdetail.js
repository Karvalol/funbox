import React from 'react'
import { GeoObject } from 'react-yandex-maps';

export const YandexMarkerDetail = props => 
<GeoObject 
  geometry={{
    coordinates: [ Number(props.marker.lat), Number(props.marker.lon) ],
    type: 'Point'
  }} 
  properties={{
    balloonContent: props.marker.name
  }} 
  options={{
    draggable: true,
    index: props.marker.index
  }} 
  onDragEnd={props.moveCallback}/>