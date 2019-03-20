import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from '../assets/images/vila-logo.png';
class NavBar extends Component {
    state = {  }
    render() { 
        return ( 
            <nav className="navbar navbar-dark bg-dark bg-faded">               
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <img src={logo} className='navbar-brand' width="60"/>      
                <span className="navbar-brand mb-0 h1">Vila Santa Rosa FC</span>                           
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className='nav-item'><Link to="/home" className="nav-link">Home</Link></li>
                        <li className='nav-item'><Link to="/jogadores" className="nav-link">Jogadores</Link></li>
                        <li className='nav-item'><Link to="/jogos" className="nav-link">Jogos</Link></li>
                        <li className='nav-item'><Link to="/contatos" className="nav-link">Contatos</Link></li>
                        <li className='nav-item'><Link to="/financeiro" className="nav-link">Financeiro</Link></li>
                        <li className='nav-item'><Link to="/estatisticas" className="nav-link">Estatísticas</Link></li>                   
                    </ul>
                </div>  

                        
            </nav>
         );
    }
}
 
export default NavBar;