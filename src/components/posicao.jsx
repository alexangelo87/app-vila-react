import React, { Component } from 'react';

class Posicao extends Component {
    constructor(props){
        super(props);
       this.state={
           
       }
    }
    render() { 
        return (
            <div>
                <select className="custom-select" name="posicao" value={this.props.posicao} onChange={(e)=>this.props.onJogador(e)}>                            
                        <option value="Atacante">Atacante</option>
                        <option value="Meia">Meia</option>
                        <option value="Volante">Volante</option>
                        <option value="Zagueiro">Zagueiro</option>
                        <option value="Lateral Esquerdo">Lateral Esquerdo</option>
                        <option value="Lateral Direito">Lateral Direito</option>
                        <option value="Goleiro">Goleiro</option>
                    </select>
            </div>
        );
    }
}
 
export default Posicao;