import React, { Component } from 'react';
import {firebaseDatabase} from '../services/firebaseConfig';
import { Link } from "react-router-dom";

class Jogos extends Component {
    constructor(props){
        super(props);
        this.state = {
            jogos:[],
            id:'',
            nomeAdversario:'',
            placarAdversario:0,
            placarVila:0,
            data:'',
            local:'',
            renda:''
        }

        this.getJogos();
    }

    handleJogo = (event) =>{
        const name = event.target.name;
        const value = event.target.type ==='checkbox' ? event.target.checked : event.target.value;
        this.setState({[name] : value});    
        console.log(value);    
    }

    getJogos = () =>{
        var arrJogos = [];                
        var objeto = this;
        firebaseDatabase.ref('jogos').once('value', function(snapshot) {           
            snapshot.forEach(function (item){
                let jogo = {
                    id:item.key,
                    nomeAdversario:item.val().nomeAdversario,
                    placarAdversario:item.val().placarAdversario,
                    placarVila:item.val().placarVila,
                    data:item.val().data,
                    local:item.val().local,
                    renda:item.val().renda
                };                            
                arrJogos.push(jogo);
                objeto.setState({
                    jogos:arrJogos
                })                
            });                                               
        });             
    }

    deleteJogo=(jogo)=>{
        firebaseDatabase.ref().child('/jogos/'+jogo.id).remove(function(error){
            if(error){
                console.log('Houve um erro na exclusão');
            }else{
                console.log('Excluído com sucesso');
            }
        });
    }

    addJogo =(e)=>{
        if(
            this.state.nomeAdversario.length<1 ||
            this.state.placarAdversario.length<1 ||
            this.state.placarVila.length<1 ||
            this.state.placarVila.length<1 ||
            this.state.local.length<1 ||
            this.state.renda.length<1
        ){
            alert("Preencha os campos corretamente")
            console.log(this.state.nomeAdversario.length);
        }else{
            
            var jogo = {
                nomeAdversario:this.state.nomeAdversario,
                placarAdversario:this.state.placarAdversario,
                placarVila:this.state.placarVila,
                data:this.state.data,
                local:this.state.local,
                renda:this.state.renda
            }
        
            firebaseDatabase.ref().child('jogos').push(jogo,function(error){
                if (error) {
                    alert('Erro ao adicionar o jogo');
                } else {
                    alert('Jogo adicionado com sucesso!');
                }
            });
        }        
        
        e.preventDefault();
    }

   
    render() { 
        return (
            <div>
                <h4>Jogos</h4>
                <hr/>
                <div className='row'>
                    <div className='col-4'>
                        <div>
                            <label>Adversário:</label>
                            <input type='text' name='nomeAdversario' value={this.state.nomeAdversario.value} onChange={this.handleJogo} className="form-control" required/>
                        </div>
                        <div>
                            <label>Data:</label>
                            <input type='date' name='data' value={this.state.data.value} onChange={this.handleJogo}  className="form-control" required/>
                        </div>
                        <div>
                            <label>Local:</label>
                            <input type='text' name='local' value={this.state.local.value} onChange={this.handleJogo}  className="form-control" required/>
                        </div>
                        <br/>
                        <div>
                            <label><b>Placar</b></label>
                            <div className="row">
                                <div className="col-4">
                                    <label>Vila</label>
                                    <input type='text' name='placarVila' value={this.state.placarVila.value} onChange={this.handleJogo}  className="form-control" required/>
                                </div>
                                <div className="col-2">
                                    <h4 className="text-center">X</h4>
                                </div>
                                <div className="col-4">
                                    <label>Adversário</label>
                                    <input type="text" className="form-control" name='placarAdversario' onChange={this.handleJogo} value={this.state.placarAdversario.value} required/>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div>
                            <label>Renda R$:</label>
                            <input type='number' name='renda' value={this.state.renda.value} onChange={this.handleJogo}  className="form-control" required/>
                        </div>
                        <br/>
                        <div>
                            <button className="btn btn-warning" onClick={this.addJogo}>Salvar</button>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-6">
                        <div className="list-group text-center">
                            {this.state.jogos.map(
                                (jogo,index)=> <Link key={index}  to={"/jogo/"+jogo.id} className="list-group-item list-group-item-action">
                                                    Vila {jogo.placarVila} x {jogo.placarAdversario} {jogo.nomeAdversario}
                                              </Link>
                            )}
                                          
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Jogos;