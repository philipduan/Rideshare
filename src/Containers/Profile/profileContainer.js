import React, { Component } from 'react';
import { ProfileCard } from './ProfileCard';
import { ProfileDriver } from './ProfileDriver';
import { ProfilePassenger } from './ProfilePassenger';
import axios from 'axios';

import './style.css';

export default class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    };
  }

  componentWillMount() {
    // axios.get('https://rideshareserve.herokuapp.com/user/').then(data => {
    //   if (data) {
    //     console.log('data: ', data);
    //     let user = data.find(user => user._id === this.props.match.params.id);
    //     return this.setState({ user });
    //   }
    //   console.log('no data');
    // });
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
