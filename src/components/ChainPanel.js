import React, { Component } from 'react';
import axios from 'axios';

export class ChainPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            chainData: null
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const response = await axios.get('https://vercel-chain-scrape.vercel.app');
            this.setState({ chainData: response.data });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    render(){
        return(
            <div id='chain_wrap'>
                <h2>Response Status from Vercel Serverless Function</h2>
                <p>{this.state.chainData}</p>
            </div>
        );
    }
}