import React, { Component } from 'react';

class Financeiro extends Component {
    state = {  }
    render() { 
        return (
        <div>
            <h4>Financeiro</h4>
            <hr/>
            <div className="">
                <div className="col-4">
                    <h2>Entrada</h2>
                    <div className=" form-group">
                        <label>Valor: R$</label>
                        <input type="text" value="" className="form-control"/>                        
                    </div>  
                    <div className="form-group">
                        <label>Origem: </label>
                        <input type="text" value="" className="form-control"/>                        
                    </div>
                    <div className="form-group">
                        <button className="btn btn-warning">Enviar</button>
                    </div>  
                </div>
                <hr/>
                <div className="col-4">
                    <h2>Saída</h2>
                    <div className="form-group">
                        <label>Valor: R$</label>
                        <input type="text" value="" className="form-control"/>                        
                    </div>  
                    <div className="form-group">
                        <label>Destino:</label>
                        <input type="text" value="" className="form-control"/>                        
                    </div>
                    <div className="form-group">
                        <button className="btn btn-warning">Enviar</button>
                    </div>  
                </div>
                <hr />
                <div>
                    <h2>Total: R$</h2>
                </div>
            </div>
        </div>
        );
    }
}
 
export default Financeiro;