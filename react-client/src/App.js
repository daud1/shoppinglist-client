import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';

//import components
import LogIn from './components/auth/logIn.component';
import SignUp from './components/auth/signUp.component';
import forgotPassword from './components/auth/forgotPassword.component';
import itemsViewComponent from './components/items/itemsView.component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>

          <Route exact path='/' component={LogIn} />
          <Route exact path='/login' component={LogIn} />
          <Route exact path='/register' component={SignUp} />
          <Route exact path='/forgotpassword' component={forgotPassword} />
          <Route exact path='/listitems' component={itemsViewComponent} />
          
        </Switch>
      </div>
    );
  }
}

export default App;
