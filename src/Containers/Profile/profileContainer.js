import React, { Component } from 'react';
import { ProfileCard } from './ProfileCard';
// import { ProfileDriver } from './ProfileDriver';
// import { ProfilePassenger } from './ProfilePassenger';
import axios from 'axios';

import './style.css';

export default class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoading: true
    };
  }

  componentWillMount() {
    let user = sessionStorage.getItem('userId');
    // this.setState({ user });
    axios
      .get(`https://rideshareserve.herokuapp.com/user/${user}`)
      .then(res => {
        console.log(res.data[0], 'response');
        this.setState({ user: res.data[0] });
        console.log('state', this.state.user);
      })
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch(err => {
        console.log('this is error', err);
      });
  }

  render() {
    console.log('render', this.state.user);
    return (
      <div>
        {//this.state.isLoading === false ? (
        this.state.user ? (
          <div className="Profile-Container">
            <ProfileCard data={this.state.user} />
            {/* <ProfileDriver data={this.state.user} />
            <ProfilePassenger data={this.state.user} /> */}
          </div>
        ) : (
          'null'
        )}
      </div>
    );
  }
}
