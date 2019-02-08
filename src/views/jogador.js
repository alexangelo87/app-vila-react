import React, { Component } from 'react';
import {firebaseDatabase} from '../services/firebaseConfig';

class Jogador extends Component {
    constructor(props){
        super(props);        
        this.state={
            id:this.props.match.params.id,
            nome:'',
            posicao:'',
            jogos:null,
            gols:null
        }
        this.getJogador();
        this.updateJogador = this.updateJogador.bind(this);
    }

    getJogador=()=>{ 
        var jogador = this;    
        firebaseDatabase.ref('jogadores/'+this.state.id).once('value', function(snapshot) {           
            jogador.setState({nome:snapshot.val().nome, posicao:snapshot.val().posicao});
          });
    }

    handleJogador =(event)=>{
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name] : value});
    }

    updateJogador=()=>{
        firebaseDatabase.ref('jogadores/' + this.state.id).set({
            nome: this.state.nome,
            posicao: this.state.posicao,
            gols : this.state.gols,
            jogos:this.state.jogos
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
            <div>
                <div>
                    <input type="text" id="nome" name="nome" value={this.state.nome} onChange={this.handleJogador}/>
                </div>
                <div>
                    <input type="text" id="posicao" name="posicao" value={this.state.posicao } onChange={this.handleJogador}/>
                </div>
                <button onClick={this.updateJogador}>salvar</button>               
            </div>
         );
    }
}
 
export default Jogador;