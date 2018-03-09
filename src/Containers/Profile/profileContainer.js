import React, { Component } from 'react';
import { ProfileDriver } from './ProfileDriver';
import { ProfilePassenger } from './ProfilePassenger';
import './style.css';

export default class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const driver = false;
    return (
      <div className="Profile-Container">
        {driver ? (
          <ProfileDriver text="driver" />
        ) : (
          <ProfilePassenger text="passenger" />
        )}
      </div>
    );
  }
}
