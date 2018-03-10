import React, { Component } from 'react';
import Ride from './Ride';
import './RideFeed.css';

class RideFeed extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className="Ride-Feed-Container">
        <h1> Ride Feed </h1>
        <Ride />
        <Ride />
        {/* {this.rides.map(ride => {
          return <Ride key={rides.id} ride={ride} />;
        })} */}
      </div>
    );
  }
}

export default RideFeed;
