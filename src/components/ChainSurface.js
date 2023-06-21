import React, { Component } from 'react';
import Plot from 'react-plotly.js'

export class ChainSurface extends Component{
    render(){
        return(
            <Plot 
                data = {[{
                    type: 'surface',
                    colorscale: 'Electric',
                    x: this.props.strikes_yte,
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
        );
    }
}

export default ChainSurface;