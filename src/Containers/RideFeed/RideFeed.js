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
        <Ride />
        <Ride />
        <Ride />

        {/* {this.drivers.map(ride => {
          return <Ride ride={ride} />;
        })} */}
        <button className="Passenger-Profile-Button"> My Profile </button>
      </div>
    );
  }
}

export default RideFeed;
