import React, { Component } from 'react';
import {firebaseDatabase} from '../services/firebaseConfig';
import Posicao from '../components/posicao';

class Jogador extends Component {
    constructor(props){
        super(props);        
        this.state={
            id:this.props.match.params.id,
            nome:'',
            posicao:'',
            jogos:0,
            gols:0,
            ativo:true
        }
        this.getJogador();
        this.updateJogador = this.updateJogador.bind(this);
    }

    getJogador=()=>{ 
        var jogador = this;    
        firebaseDatabase.ref('jogadores/'+this.state.id).once('value', function(snapshot) {           
            jogador.setState({nome:snapshot.val().nome, 
                posicao:snapshot.val().posicao,
                 gols:snapshot.val().gols,
                 ativo:snapshot.val().ativo});
          });
    }

    handleJogador =(event)=>{
        console.log('evento');
        const name = event.target.name;
        const value = event.target.type ==='checkbox' ? event.target.checked : event.target.value;;
        this.setState({[name] : value});
    }

    updateJogador=()=>{
        firebaseDatabase.ref('jogadores/' + this.state.id).update({
            nome: this.state.nome,
            posicao: this.state.posicao,
            gols : this.state.gols,
            jogos:this.state.jogos,
            ativo:this.state.ativo
          }, function(error) {
            if (error) {
             console.log("Erro ao salvar")
            } else {
                console.log("Atualizado com sucesso")
            }
          });
    }

    render() { 
        return ( 
            <div className='container'>
                <div className='col-4'>
                    <div>
                        <label htmlFor="nome">Nome:</label>
                        <input type="text" id="nome" name="nome" value={this.state.nome} onChange={this.handleJogador}/>
                    </div>
                    <label>Posição</label>
                    <Posicao onJogador={this.handleJogador} posicao={this.state.posicao}/>
                    <div>
                    <label htmlFor='gols'>Gols</label>
                        <input type="number" id="gols" name="gols" value={this.state.gols} onChange={this.handleJogador} readOnly/>
                    </div>
                    <div>
                        <label htmlFor='jogos'>Jogos</label>
                        <input type="number" id="jogos" name="jogos" value={this.state.jogos} onChange={this.handleJogador} readOnly/>
                    </div>
                    <div>
                        <label>Ativo?</label>
                        <input type="checkbox"  checked={this.state.ativo} onChange={this.handleJogador} name='ativo'/>
                    </div>
                    <button onClick={this.updateJogador}>Salvar</button>
                </div>               
            </div>
         );
    }
}
 
export default Jogador;