import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import {withGoogleMap, GoogleMap, DirectionsRenderer, Marker} from 'react-google-maps';

const Map = compose(
  withProps({
    containerElement: <div className="col-sm-9  map" />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withGoogleMap,
  lifecycle({
    componentDidUpdate(prevProps) {
      //если реализовывать перетаскивания объектов в списке, то это условие не будет работать корректно
      if (this.props.waypoints.length === prevProps.waypoints.length) return;
      if (this.props.waypoints.length === 0) {this.setState({
        directions: null,
        shouldShowMarker: false});
        return;
      } else if (this.props.waypoints.length === 1) {
        const markerPos = this.props.waypoints[0].geometry.location;
        this.setState({
          shouldShowMarker: true,
          markerPosition: markerPos,
          directions: null
        })
        return;
      } else if (this.props.waypoints.length >= 2) {
        const DirectionsService = new google.maps.DirectionsService();
        const WPlocations = this.props.waypoints.map(i => i.geometry.location);
        const inBetweenWPs = WPlocations.slice(1,WPlocations.length-1).map(i => {return {location: i,stopover: false}});
        DirectionsService.route({
          origin: WPlocations[0],
          destination: WPlocations[WPlocations.length-1],
          waypoints: inBetweenWPs,
          travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              shouldShowMarker: false,
              directions: result
            });
          }
        });
      }
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={new google.maps.LatLng(51.826578194556454, 107.58687739157449)}
  >
    {props.shouldShowMarker && <Marker position={props.markerPosition}/>}
    {props.directions && <DirectionsRenderer directions={props.directions} onClick={(info) => console.log(info)}/>}
  </GoogleMap>
);

export default Map;
