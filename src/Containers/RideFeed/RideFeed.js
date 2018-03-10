import React, { Component } from 'react';
import Ride from './Ride';
import './RideFeed.css';

class RideFeed extends Component {
  constructor() {
    super();

    this.state = {
      show: true,
      here: true
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    console.log(sessionStorage.getItem('address'));
    if (
      !sessionStorage.getItem('address') ||
      sessionStorage.getItem('address') ===
        '3401 Dufferin Street, Toronto, ON, M6A 2T9'
    ) {
      this.setState({ show: false });
    }
  }
  handleChange() {
    this.setState({
      here: false
    });
  }

  render() {
    return (
      <div className="Ride-Feed-Container">
        <h1> Ride Feed </h1>
        {this.state.show === true ? (
          this.state.here === true ? (
            <Ride handleChange={this.handleChange} />
          ) : (
            <p
              style={{
                color: 'white',
                fontSize: 20,
                marginTop: 40,
                fontFamily: 'Open Sans Condensed'
              }}
            >
              {' '}
              Ride Requested!{' '}
            </p>
          )
        ) : (
          <p
            style={{
              color: 'white',
              fontSize: 20,
              marginTop: 40,
              fontFamily: 'Open Sans Condensed'
            }}
          >
            {' '}
            No Ride Found!{' '}
          </p>
        )}
        {/* {this.drivers.map(ride => {
          return <Ride ride={ride} />;
        })} */}
        <button className="Passenger-Profile-Button"> My Profile </button>
      </div>
    );
  }
}

export default RideFeed;
