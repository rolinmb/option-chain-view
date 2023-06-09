import React, { Component } from 'react';
import axios from 'axios';

export class OptionChain extends Component{
    constructor(props){
        super(props);
        this.state = {
            chainData: ''
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const response = await axios.get('https://react-testing-xi.vercel.app/');
            this.setState({ chainData: response.data.data });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    render(){
        return(
            <div id='chain_wrap'>
                <h2>Scraped HTML</h2>
                <p>{this.state.chainData}</p>
            </div>
        );
    }
}