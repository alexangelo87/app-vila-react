import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Menu extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/jogadores">Jogadores</Link></li>
                    <li><Link to="/jogos">Jogos</Link></li>
                    <li><Link to="/contatos">Contatos</Link></li>
                    <li><Link to="/financeiro">Financeiro</Link></li>
                    <li><Link to="/estatisticas">Estatísticas</Link></li>
                </ul>
            </div> 
        );
    }
}
 
export default Menu;