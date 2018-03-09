import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import store from './Redux/store';
import App from './Components/App/App';
import Options from './Containers/Options/Options';
//biiiiii
const Rideshare = () => {
  return (
    <BrowserRouter>
      <MuiThemeProvider>
        <Provider store={store}>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/options" component={Options} />
          </Switch>
        </Provider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
};
//done

ReactDOM.render(<Rideshare />, document.getElementById('root'));
registerServiceWorker();
//phil
