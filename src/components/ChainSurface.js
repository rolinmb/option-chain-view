import React, { Component } from 'react';
import Plot from 'react-plotly.js';

export class ChainSurface extends Component{
    render(){
        return(
            <div id="plotly_area">
                <Plot 
                    data = {[{
                        type: 'surface',
                        x: this.props.strikes,
                        y: this.props.ytes,
                        z: this.props.data,
                    }]}
                    layout={{
                        autosize: false,
                        width: 700,
                        height: 700,
                        title: this.props.title,
                    }}
                />
            </div>
        );
    }
}