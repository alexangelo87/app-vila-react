import React, { Component } from 'react';
import {firebaseDatabase} from '../services/firebaseConfig';
import { Link } from "react-router-dom";
import Posicao from '../components/posicao';

class Jogadores extends Component {

    constructor(props){
        super(props);        
        this.state ={
            jogadores : [],           
            nome:'',
            posicao:'',
            ativo:true
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
                    <div className="col-6 ">
                        <div className='form-group'>
                            <label>Nome:</label>
                            <input type="text" className={'form-control'} name="nome" id="nome" value={this.state.nome.value} onChange={this.handleJogador}/>                        
                        </div>
                        <label>Posição:</label>
                        <Posicao onJogador={this.handleJogador} posicao={this.state.posicao}/>
                        <div  className='form-group'>
                            <label>Ativo?</label>
                            <input type="checkbox"  checked={this.state.ativo} onChange={this.handleJogador} name='ativo'/>
                        </div>
                        <button onClick={this.addJogador} className={'btn btn-warning'}>Add Jogador</button>
                    </div>
                   
                    <div className="col-8">
                        <hr/>
                        <ul className='list-group'>
                            {this.state.jogadores.map(
                                (jogador,index)=>                                
                                <li className='list-group-item' key={index}> 
                                    <Link to={"/jogador/"+jogador.id}> {jogador.nome} </Link> | <a href="" onClick={()=>this.removeJogador(jogador)}>X</a>
                                </li>
                                )}
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
        const value = event.target.type ==='checkbox' ? event.target.checked : event.target.value;
        this.setState({[name] : value});
    }

    addJogador =(e)=>{
        if(this.state.nome.length >0 ){
            var jogador = {
                gols :0,
                jogos:0,
                nome:this.state.nome,
                posicao:this.state.posicao,
                ativo:this.state.ativo
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
    }
   
}
 
export default Jogadores;