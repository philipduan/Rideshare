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
    let user = sessionStorage.getItem('userId');
    // this.setState({ user });
    axios
      .get(`https://rideshareserve.herokuapp.com/user/${user}`)
      .then(res => {
        console.log(res, 'response');
        return res;
      })
      .then(res => {
        console.log('working');
        this.setState({ user: res.data[0] });
      });
  }

  render() {
    console.log(this.state.user[0]);
    const page =
      this.state.user.length === 1 ? (
        <div className="Profile-Container">
          <ProfileCard data={this.state.user[0]} text="card" />
          <ProfileDriver data={this.state.user[0]} text="driver" />
          <ProfilePassenger data={this.state.user[0]} text="passenger" />
        </div>
      ) : (
        'null'
      );
    return <div>{page}</div>;
  }
}
