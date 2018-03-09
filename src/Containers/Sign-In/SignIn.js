import React, { Component } from 'react';
import firebase from './firebase';
import { withRouter } from 'react-router-dom';
import './styles.css';
import ValidatedTextField from '../../Components/ValidatedTextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      advance: true
    };
  }
  componentWillMount() {
    // firebase
    //   .auth()
    //   .onAuthStateChanged(
    //     user => (user ? this.props.history.push('/items') : null)
    //   );
  }
  handleUserChange = event => {
    console.log(event.target.value);

    this.setState({ email: event.target.value });
    this.check();
  };
  handlePassChange = event => {
    this.setState({ password: event.target.value });
    this.check();
  };

  login = event => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        console.log('you have signed bak in');
      })
      .then(() => {
        this.props.history.push('/choose');
      })
      .catch(err => {
        console.log('there is an err', err);
      });
  };
  check = () => {
    if (this.state.password && this.state.email) {
      this.setState({ advance: false });
    } else {
      this.setState({ advance: true });
    }
  };

  render() {
    return (
      <div className="page login">
        <div className="logo" />
        <div className="cardContainer">
          <Paper zDepth={5}>
            <div className="formContainer">
              <form onSubmit={this.login} autoComplete="off">
                <div>
                  <ValidatedTextField
                    change={this.handleUserChange}
                    type="email"
                    // error="Invalid Email"
                    label="Email"
                  />
                </div>
                <div>
                  <ValidatedTextField
                    change={this.handlePassChange}
                    type="password"
                    // error="Invalid Password"
                    label="Password"
                  />
                </div>

                <RaisedButton
                  fullWidth
                  primary
                  className="enterButton"
                  onClick={() => this.props.history.push(`/create`)}
                >
                  Create Account
                </RaisedButton>
                <RaisedButton
                  className="enterButton"
                  primary
                  disabled={this.state.advance}
                  fullWidth
                  type="submit"
                >
                  Sign In
                </RaisedButton>
              </form>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
