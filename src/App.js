import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from "react-router-dom";
import logo from './logo.svg';
import Menu from './components/menu';
import './App.css';
import Home from './views/home';
import 'bootstrap/dist/css/bootstrap.css';
import Jogadores from './views/jogadores';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <div className='row'>
            <div className="col-3">
              <Menu />
            </div>
            <div className="col-9">
              <Route  path = "/" exact component = {Home}/>          
              <Route path = "/home" component = {Home} />          
              <Route path = "/jogadores" component = {Jogadores} />
            </div>
          </div>         
        </div>        
      </Router> 
    );
  }
}

export default App;
