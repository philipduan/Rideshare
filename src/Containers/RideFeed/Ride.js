import React, { Component } from 'react';
import firebase from '../Sign-In/firebase';
import './Ride.css';
import { withRouter } from 'react-router';
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
      name: 'Max Page', // driver.name
      destination: '462 Wellington St W, Toronto, ON', // driver.destination
      startingaddress: '7 Joseph St, Markham, ON', // driver.pickup
      date: '2018-03-10',
      time: '18:00',
      vehicle: {
        make: 'Nissan',
        model: 'Altima',
        lper100: 8.2,
        licenceplace: 'BZDZ787',
        capacity: 4
      },
      passengers: ['']
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
    this.props.history.push('/profile');
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
          </p>
          <p className="Ride-Destination">
            {' '}
            <span>Starting Address: </span> {this.driver.startingaddress}{' '}
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
        <button onClick={this.props.handleChange} className="RSVP-button">
          {' '}
          Request Ride{' '}
        </button>
      </div>
    );
  }
}

Ride = withRouter(Ride);
export default Ride;
