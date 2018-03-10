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
import Instance from './Containers/Instance/Instance';
import Register from './Containers/Register/Register';
import muiTheme from './theme';
import RideFeed from './Containers/RideFeed/RideFeed';

//biiiiii
const Rideshare = () => {
  return (
    <BrowserRouter>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
          <Switch>
            <Route path="/profile" component={Profile} />
            <Route path="/options" component={Options} />
            <Route exact path="/" component={SignIn} />
            <Route path="/instance/:type" component={Instance} />
            <Route exact path="/register" component={Register} />
            <Route path="/ridefeed" component={RideFeed} />
          </Switch>
        </Provider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(<Rideshare />, document.getElementById('root'));
registerServiceWorker();
