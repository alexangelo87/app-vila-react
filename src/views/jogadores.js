import React, { Component } from 'react';
import {firebaseDatabase} from '../services/firebaseConfig';

class Jogadores extends Component {

    constructor(props){
        super(props);        
        this.state ={
            jogadores : [],
            jogador : {
               nome :'',
               posicao:'',
               gols:0,
               jogos:0
            },
            nome:'',
            posicao:'',
        }

        this.addJogador = this.addJogador.bind(this);
        this.getJogador();
        
    }

    render() {               
        return ( 
            <div>
                <h4>Jogadores</h4>
                <hr/>
                <div className="col-4">
                    <input type="text" placeholder="nome" name="nome" value={this.state.nome.value} onChange={this.handleJogador}/>
                    <input type="text" placeholder="posicao" name="posicao" value={this.state.posicao.value} onChange={this.handleJogador}/>
                </div>
                <button onClick={this.addJogador}>Add Jogador</button>
                <ul>
                    {this.state.jogadores.map((jogador,index)=><li key={index}>{jogador.nome} | <a href="#" onClick={()=>this.removeJogador(jogador)}>X</a></li>)}
                </ul>
            </div>
         );
    }

    getJogador = () =>{
        var arrJogadores = [];
        var jogadores = this;
        firebaseDatabase.ref('jogadores').once('value', function(snapshot) {
            snapshot.forEach(function (item){
                let jogador = {
                    id:item.key,
                    nome: item.val().nome,
                    posicao: item.val().posicao,
                    jogos: item.val().jogos,
                    gols: item.val().gols
                }
                arrJogadores.push(jogador);                
            });            
            jogadores.setState({jogadores:arrJogadores});
            //console.log(jogadores.state.jogadores);               
          });        
       
    }

    handleJogador =(event)=>{
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name] : value});

    }

    addJogador =()=>{
        //this.setState({jogadores:[]});
        var jogador = {
            gols :0,
            jogos:0,
            nome:this.state.nome,
            posicao:this.state.posicao
        }               
        firebaseDatabase.ref().child('jogadores').push(jogador,function(error){
            if (error) {
                console.log('Erro ao adicionar o jogador');
              } else {
                console.log('Jogador adicionado com sucesso!');
              }
        });
        this.getJogador();
    }

    removeJogador=(jogador)=>{       
        firebaseDatabase.ref().child('/jogadores/'+jogador.id).remove(function(error){
            if(error){
                console.log('Houve um erro na exclusão');
            }else{
                console.log('Excluído com sucesso');
            }
        });
        this.getJogador();
    }
   
}
 
export default Jogadores;