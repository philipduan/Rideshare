import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import Profile from './Containers/Profile/index';
import store from './Redux/store';
import App from './Components/App/App';
import Options from './Containers/Options/Options';
import SignIn from './Containers/Sign-In/SignIn';
import PassengerInstance from './Containers/PassengerInstance/PassengerInstance';
import DriverInstance from './Containers/DriverInstance/DriverInstance';
import RideFeed from './Containers/RideFeed/RideFeed';

//biiiiii
const Rideshare = () => {
  return (
    <BrowserRouter>
      <MuiThemeProvider>
        <Provider store={store}>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/profile" component={Profile} />
            <Route path="/options" component={Options} />
            <Route exact path="/signin" component={SignIn} />
            <Route path="/passengerinstance" component={PassengerInstance} />
            <Route path="/driverinstance" component={DriverInstance} />
            <Route path="/ridefeed" component={RideFeed} />
          </Switch>
        </Provider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(<Rideshare />, document.getElementById('root'));
registerServiceWorker();
