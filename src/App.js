import React from 'react';
import Map from './Map.js';
import SearchInput from './SearchInput.js';
import WaypointsList from './WaypointsList.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waypoints: []
    }
  }

  onNewPlace(point) {
    this.setState({waypoints:[...this.state.waypoints,point]});
  }

  onDeleteWP(index) {
    let WPs = [...this.state.waypoints];
    WPs.splice(index,1);
    this.setState({waypoints:WPs});
  }

  render() {
    return (
      <div className="App fluid-container row  no-gutters">
        <div className="col-sm-3  list">
        <SearchInput onNewPlace={(point) => this.onNewPlace(point)} waypoints={this.state.waypoints}/>
        <WaypointsList waypoints={this.state.waypoints} onDeleteWP={index => this.onDeleteWP(index)}/>
        </div>
        <Map waypoints={this.state.waypoints}/>
      </div>
    )
  }
}
