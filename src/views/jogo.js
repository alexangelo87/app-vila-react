import React, { Component } from 'react';
import { firebaseDatabase } from '../services/firebaseConfig';

class Jogo extends Component {
    constructor(props){
        super(props);        
        this.state={
            id:this.props.match.params.id,
            nomeAdversario:'',
            placarAdversario:0,
            placarVila:0,
            data:'',
            local:'',
            renda:''           
        }
        this.getJogo();
        //this.updateJogo = this.updateJogo.bind(this);
    }

    getJogo=()=>{ 
        var jogo = this;    
        firebaseDatabase.ref('jogos/'+this.state.id).once('value', function(snapshot) {           
            jogo.setState({
                nomeAdversario:snapshot.val().nomeAdversario,
                placarAdversario:snapshot.val().placarAdversario,
                placarVila:snapshot.val().placarVila,
                data:snapshot.val().data,
                local:snapshot.val().local,
                renda:snapshot.val().renda
            });
          });
    }

    handleJogo =(event)=>{
        const name = event.target.name;
        const value = event.target.type ==='checkbox' ? event.target.checked : event.target.value;;
        this.setState({[name] : value});
    }

    updateJogo=()=>{
        firebaseDatabase.ref('jogos/' + this.state.id).update({
            nomeAdversario:this.state.nomeAdversario,
            placarAdversario:this.state.placarAdversario,
            placarVila:this.state.placarVila,
            data:this.state.data,
            local:this.state.local,
            renda:this.state.renda
          }, function(error) {
            if (error) {
             alert("Erro ao salvar")
            } else {
                alert("Atualizado com sucesso")
            }
          });
    }

    render() { 
        return ( 
        <div>            
            <div className="col-8">
                <div className="form-group">
                    <label><b>Adversário:</b></label>
                    <input type="text" value={this.state.nomeAdversario} name="nomeAdversario" className="form-control" onChange={this.handleJogo}/>
                </div>
                <div>
                    <label><b>Placar</b></label>
                    <div className="row">
                        <div className="col-4">
                            <label>Vila</label>
                            <input type='text' name='placarVila' value={this.state.placarVila} onChange={this.handleJogo}  className="form-control" required/>
                        </div>
                        <div className="col-2">
                            <h4 className="text-center">X</h4>
                        </div>
                        <div className="col-4">
                            <label>Adversário</label>
                            <input type="text" className="form-control" name='placarAdversario' value={this.state.placarAdversario} onChange={this.handleJogo} required/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label><b>Data:</b></label>
                    <input type="text" value={this.state.data} className="form-control" name="data" onChange={this.handleJogo}/>
                </div> 
                <div className="form-group">
                    <label><b>Local:</b></label>
                    <input type="text" value={this.state.local} className="form-control" name="local" onChange={this.handleJogo}/>
                </div> 
                <div className="form-group">
                    <label><b>Renda:</b></label>
                    <input type="text" value={this.state.renda} className="form-control" name="renda" onChange={this.handleJogo}/>
                </div>
                <div className="form-group">       
                    <button className='btn btn-warning' onClick={this.updateJogo}>Salvar</button>
                </div>              
            </div>
        </div> 
        );
    }
}
 
export default Jogo;