import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MainPage from './Components/mainPage/index';
import  RenderOffice from './Components/officePage/index';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={MainPage} />
        <Route path="/office/:id" component={RenderOffice} />
      </div>
    );
  }
}

export default App;
