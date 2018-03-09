import React, { Component } from 'react';
import firebase from '../Sign-In/firebase';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import ValidatedTextField from '../../Components/ValidatedTextField';
import { withRouter } from 'react-router-dom';

import './styles.css';

class Create extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      userAddress: '',
      name: '',
      company: '',
      advance: true
    };
  }

  componentWillMount() {
    // firebase
    //   .auth()
    //   .onAuthStateChanged(
    //     user => (user ? this.props.history.push('/choose') : null)
    //   );
  }

  handleUserChange = event => {
    this.setState({ email: event.target.value });
    this.check();
  };

  handlePassChange = event => {
    this.setState({ password: event.target.value });
    this.check();
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
    this.check();
  };

  handleCompanyChange = event => {
    this.setState({ company: event.target.value });
    this.check();
  };
  handleAddressChange = event => {
    this.setState({ userAddress: event.target.value });
    this.check();
  };

  check = () => {
    if (
      this.state.company &&
      this.state.name &&
      this.state.password &&
      this.state.userAddress &&
      this.state.email
    ) {
      this.setState({ advance: false });
    } else {
      null;
    }
  };

  create = event => {
    event.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      company: this.state.company,
      userAddress: this.state.userAddress
    };
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      // .then(data => {
      //   fetch('https://boomtown-server.herokuapp.com/users/', {
      //     method: 'POST',

      //     body: JSON.stringify(user),
      //     headers: new Headers({
      //       'Content-Type': 'application/json'
      //     })
      //   });
      // })
      .then(() => {
        this.props.history.push('/items');
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  render() {
    return (
      <div className="page login">
        <div className="cardContainer">
          <Paper zDepth={5}>
            <div className="formContainer">
              <form onSubmit={this.create} autoComplete="off">
                <div>
                  <ValidatedTextField
                    change={this.handleUserChange}
                    type="email"
                    label="Email"
                  />
                </div>
                <div>
                  <ValidatedTextField
                    change={this.handlePassChange}
                    type="password"
                    label="Password"
                  />
                </div>
                <div>
                  <ValidatedTextField
                    change={this.handleNameChange}
                    type="text"
                    label="Your Name"
                  />
                </div>
                <div>
                  <ValidatedTextField
                    change={this.handleCompanyChange}
                    type="textarea"
                    label="Place Of Work"
                  />
                </div>
                <div>
                  <ValidatedTextField
                    change={this.handleAddressChange}
                    type="text"
                    label="Address"
                  />
                </div>
                <RaisedButton
                  disabled={this.state.advance}
                  className="enterButton"
                  primary
                  type="submit"
                  fullWidth
                >
                  Create
                </RaisedButton>
              </form>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withRouter(Create);
