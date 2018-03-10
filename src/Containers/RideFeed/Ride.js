import React, { Component } from 'react';
import firebase from '../Sign-In/firebase';
import './Ride.css';
import axios from 'axios';

class Ride extends Component {
  constructor() {
    super();

    this.state = {
      costPerPassenger: 0,
      occupants: '',
      user: []
    };

    this.driver = {
      name: 'Big Homie Quan', // driver.name
      destination: '462 Wellington St W, Toronto, ON', // driver.destination
      pickup: 'Markham Rd & Hwy 7', // driver.pickup
      date: '2018-03-09',
      time: '8:00',
      vehicle: {
        make: 'Nissan',
        model: 'Altima',
        lper100: 8.2,
        licenceplace: 'BGHOMIEQ',
        capacity: 3
      },
      passengers: ['User', 'User2']
    };

    this.getRideCost = this.getRideCost.bind(this);
    this.handleRSVP = this.handleRSVP.bind(this);
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
      console.log(this.state.user.id);
    });
    axios
      .get('https://rideshareserve.herokuapp.com/driver')
      .then(driver => {
        console.log(driver);
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.getRideCost();
  }

  handleRSVP() {
    this.setState({
      ocupants: this.state.user
    });
    //send request to driver --- updates on driver end
    axios
      .patch(
        'https://rideshareserve.herokuapp.com/driver/occupants/${driverId}',
        {
          occupants: this.state.occupants
        }
      )
      .then(response => {
        return response;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getRideCost() {
    let fuelCost = '1.23';
    let tripDistance = 38; // ride object - distance between ride.pickup ride.destination;
    let numberOfPassengers = this.driver.passengers.length; //driver object - number of passenger ids in passenger array
    let gasCost = this.driver.vehicle.lper100 / 100 * tripDistance; //driver object - driver.car.lper100 / 100 * tripDistance * fuelCost;
    let wtCost = 0.049 * tripDistance; // * tripDistance;
    let totalCost = gasCost + wtCost;
    let costPerPassenger = totalCost / numberOfPassengers;
    this.setState({
      costPerPassenger: costPerPassenger.toFixed(2)
    });
  }

  render() {
    return (
      <div className="Ride-Container">
        <div className="Ride-Information">
          <h3> {this.driver.name} </h3>
          <p className="Ride-Destination">
            {' '}
            <span>Destination: </span> {this.driver.destination}{' '}
            <span> Pickup: </span>
            {this.driver.pickup}
          </p>
          <p className="Ride-Destination">
            {' '}
            <span>When:</span> {this.driver.date} {this.driver.time}{' '}
          </p>
          <p className="Ride-Destination">
            {' '}
            <span>Vehicle:</span> {this.driver.vehicle.make}{' '}
            {this.driver.vehicle.model} <span>License Plate:</span>{' '}
            {this.driver.vehicle.licenceplace}{' '}
          </p>
          <p className="Ride-Destination">
            {' '}
            <span>Passengers:</span> {this.driver.passengers.length}{' '}
          </p>
        </div>
        <div className="Ride-Costs">
          <p> Your estimated trip cost: ${this.state.costPerPassenger} </p>
        </div>
        <button onClick={this.handleRSVP} className="RSVP-button">
          {' '}
          Request Ride{' '}
        </button>
      </div>
    );
  }
}

export default Ride;
