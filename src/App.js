import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from "react-router-dom";
import logo from './logo.svg';
import Menu from './components/menu';
import './App.css';
import Home from './views/home';
import 'bootstrap/dist/css/bootstrap.css';
import Jogadores from './views/jogadores';
import Jogador from './views/jogador';
import Jogos from './views/jogos';
import Contatos from './views/contatos';
import Financeiro from './views/financeiro';
import NavBar from './components/navbar';
import Jogo from './views/jogo';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='container-fluid'>
          <NavBar/>
          <div className="row">            
            <div className="container">
              <Route  path = "/" exact component = {Home}/>          
              <Route path = "/home" component = {Home} />          
              <Route path = "/jogadores" component = {Jogadores} />
              <Route path="/jogador/:id" component={Jogador}/>
              <Route path="/jogos" component={Jogos}/>
              <Route path="/jogo/:id" component={Jogo}/>
              <Route path="/contatos" component={Contatos}/>
              <Route path="/financeiro" component={Financeiro}/>
              
            </div>
          </div>        
        </div>        
      </Router> 
    );
  }
}

export default App;
