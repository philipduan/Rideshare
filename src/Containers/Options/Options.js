import React, { Component } from 'react';
import './Options.css';
import { withRouter } from 'react-router';

class Options extends Component {
  constructor() {
    super();

    this.continueAsDriver = this.continueAsDriver.bind(this);
    this.continueAsPassenger = this.continueAsPassenger.bind(this);
  }

  continueAsPassenger() {
    this.props.history.push('/passengerinstance');
  }

  continueAsDriver() {
    this.props.history.push('/driverinstance');
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

Options = withRouter(Options);
export default Options;
