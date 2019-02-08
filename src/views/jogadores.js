import React, { Component } from 'react';
import {firebaseDatabase} from '../services/firebaseConfig';
import { Link } from "react-router-dom";

class Jogadores extends Component {

    constructor(props){
        super(props);        
        this.state ={
            jogadores : [],           
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
                <div className="row">
                    <div className="col-4">
                        <input type="text" placeholder="nome" name="nome" id="nome" value={this.state.nome.value} onChange={this.handleJogador}/>
                        <input type="text" placeholder="posicao" name="posicao" id="posicao" value={this.state.posicao.value} onChange={this.handleJogador}/>
                        <button onClick={this.addJogador}>Add Jogador</button>
                    </div>
                    <div className="col-8">
                        <ul>
                            {this.state.jogadores.map((jogador,index)=><li key={index}> <Link to={"/jogador/"+jogador.id}> {jogador.nome} </Link> | <a href="" onClick={()=>this.removeJogador(jogador)}>X</a></li>)}
                        </ul>
                    </div>
                </div>
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

    addJogador =(e)=>{
        if(this.state.nome.length >0 && this.state.posicao.length>0 ){
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
            e.preventDefault();
            this.reset();
            this.getJogador();
        }else{
            alert("Preencha os campos corretamente.");
        }
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

    reset(){
        document.getElementById('nome').value = '';
        document.getElementById('posicao').value = '';
    }
   
}
 
export default Jogadores;