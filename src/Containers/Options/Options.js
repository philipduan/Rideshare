import React, { Component } from 'react';
import './Options.css';

class Options extends Component {
  constructor() {
    super();

    this.continueAsDriver = this.continueAsDriver.bind(this);
    this.continueAsPassenger = this.continueAsPassenger.bind(this);
  }

  continueAsPassenger() {
    //pass in method to do so here
  }

  continueAsDriver() {
    //pass in method to do so here
  }

  render() {
    return (
      <div className="Options-Container">
        <div className="Options-Box">
          <h3> Continue as </h3>
          <button
            onClick={this.continueAsPassenger}
            className="Passenger-Button"
          >
            {' '}
            Passenger{' '}
          </button>
          <button onClick={this.continueAsDriver} className="Driver-Button">
            {' '}
            Driver{' '}
          </button>
        </div>
      </div>
    );
  }
}

export default Options;
