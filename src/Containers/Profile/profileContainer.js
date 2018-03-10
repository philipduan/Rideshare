import React, { Component } from 'react';
import { ProfileCard } from './ProfileCard';
import { ProfileDriver } from './ProfileDriver';
import { ProfilePassenger } from './ProfilePassenger';
import './style.css';

export default class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    };
  }

  componentWillMount() {
    fetch('https://rideshareserve.herokuapp.com/user/', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(data => {
      let user = data.filter(user => user._id === this.props.match.params.id);
      this.setState({ user });
    });
  }

  render() {
    return (
      <div className="Profile-Container">
        <ProfileCard data={this.state.user} text="card" />
        <ProfileDriver data={this.state.user} text="driver" />
        <ProfilePassenger data={this.state.user} text="passenger" />
      </div>
    );
  }
}
