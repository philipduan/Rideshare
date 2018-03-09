import React, { Component } from 'react';
import { ProfileCard } from './ProfileCard';
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
        <ProfileCard text="card" />
        {driver ? (
          <ProfileDriver text="driver" />
        ) : (
          <ProfilePassenger text="passenger" />
        )}
      </div>
    );
  }
}
