import React, { Component } from 'react';
import {firebaseDatabase} from '../services/firebaseConfig';

class Contatos extends Component {
    state = {  
        nomeContato:'',
        telefoneContato:'',
        enderecoContato:'',
        observacaoContato:''
    }

    addContato = (e)=>{
        console.log(e.target.name)
        if(this.state.nomeContato.length >0 ){
            var contato = {                
                nomeContato:this.state.nomeContato,
                telefoneContato:this.state.telefoneContato,
                enderecoContato:this.state.enderecoContato,
                observacaoContato:this.state.observacaoContato
            }               
            firebaseDatabase.ref().child('contatos').push(contato,function(error){
                if (error) {
                    console.log('Erro ao adicionar o contato');
                } else {
                    console.log('Contato adicionado com sucesso!');
                }
            });
            e.preventDefault();
            
        }else{
            alert("Preencha os campos corretamente.");
        }
    }

    render() { 
        return (
            <div>
                <h4>Contatos</h4>
                <hr/>
                <div className="col-4 ">
                    <div className="form-group">
                        <label>Nome:</label>
                        <input type="text"  name="nomeContato" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Telefone:</label>
                        <input type="number"  name="telefoneContato"  className="form-control"/>
                    </div>
                    <div className=" form-group">
                        <label>Endereço:</label>
                        <input type="text" name="enderecoContato" className="form-control"/>
                    </div>
                    <div className=" form-group">
                        <label>Observação:</label>
                        <input type="text" name="observacaoContato" className="form-control"/>
                    </div>
                    <div className="form-group">                        
                        <button className="btn btn-warning" onClick={this.addContato} >Salvar</button>
                    </div>
                    <div>
                        <hr/>
                        <ul>
                            <li></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Contatos;