import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';

//import components
import LogIn from './components/logIn.component';
import SignUp from './components/signUp.component';
import ShoppingLists from './components/shoppingLists.component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={LogIn} />
          <Route exact path='/login' component={LogIn} />
          <Route exact path='/register' component={SignUp} />
          <Route exact path='/mylists' component={ShoppingLists} />
        </Switch>
      </div>
    );
  }
}

export default App;
