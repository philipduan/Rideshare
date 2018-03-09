import React, { Component } from 'react';
import firebase from '../Sign-In/firebase';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import ValidatedTextField from '../../components/ValidatedTextField';
import './styles.css';

class Create extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      bio: '',
      fullname: '',
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
    this.setState({ fullname: event.target.value });
    this.check();
  };

  handleBioChange = event => {
    this.setState({ bio: event.target.value });
    this.check();
  };

  check = () => {
    if (
      this.state.bio &&
      this.state.fullname &&
      this.state.password &&
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
      fullname: this.state.fullname,
      email: this.state.email,
      bio: this.state.bio
    };
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(data => {
        fetch('https://boomtown-server.herokuapp.com/users/', {
          method: 'POST',

          body: JSON.stringify(user),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        });
      })
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
        <div className="logo">
          <img src={logo} alt="Boomtown Logo" />
        </div>
        <div className="topRight">
          <img src={topRight} alt="Sky" />
        </div>
        <div className="bottomLeft">
          <img src={bottomLeft} alt="City" />
        </div>
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
                    change={this.handleBioChange}
                    type="textarea"
                    label="About You"
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
