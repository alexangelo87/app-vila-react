import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from '../assets/images/vila-logo.jpg';

class Menu extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <ul className='list-group'>
                    <li className='list-group-item'><Link to="/home">Home</Link></li>
                    <li className='list-group-item'><Link to="/jogadores">Jogadores</Link></li>
                    <li className='list-group-item'><Link to="/jogos">Jogos</Link></li>
                    <li className='list-group-item'><Link to="/contatos">Contatos</Link></li>
                    <li className='list-group-item'><Link to="/financeiro">Financeiro</Link></li>
                    <li className='list-group-item'><Link to="/estatisticas">Estatísticas</Link></li>
                    <li><img src={logo} className='rounded-circle img-fluid logo mx-auto d-block'/></li>
                </ul>
            </div> 
        );
    }
}
 
export default Menu;