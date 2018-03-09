import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Rideshare = () => {
  <BrowserRouter>
    <MuiThemeProvider muiTheme={muiTheme}>
      {/* <Provider store={store}> */}
      <Switch>
        <Layout>
          <Route exact path="/" render={() => 'hello'} />
        </Layout>
      </Switch>
      {/* </Provider> */}
    </MuiThemeProvider>
  </BrowserRouter>;
};

ReactDOM.render(<Rideshare />, document.getElementById('root'));
registerServiceWorker();
