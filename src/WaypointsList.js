import React from 'react';

export default function WaypointsList(props) {
  return (
    <ul className="waypoint__list">
      {props.waypoints.map((i,index) =>
        <li key={i.id} className="waypoint__item">
          <h5>{i.name}</h5>
          <p>{i.formatted_address}</p>
          <button className="waypoint__close-button" onClick={() => props.onDeleteWP(index)}></button>
        </li>
      )}
    </ul>
  )
}
