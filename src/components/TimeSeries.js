import React, { Component } from 'react';
import Plot from 'react-plotly.js';

export class TimeSeries extends Component{
    constructor(props){
        super(props);
        this.state = {
            dates: [],
            adjPrices: []
         }
    }

    handleSeriesCsvSelect = (e) => {
        const files = e.target.files || e.dataTranser.files;
        if(files.length > 0){
            const file = files[0];
            if(!file.name.includes('_adj_tseries.csv')){
                alert('Please select a .csv file with name format: %TICKER%_adj_tseries.csv');
                document.getElementById('series_csv_select').value = '';
                return;
            }
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (event) => {
                const csvData = event.target.result;
                const csvRows = csvData.split('\n');
                const allDates = [];
                const allAdjPrices = [];
                for(let r = 1; r < csvRows.length; r++){
                    const colData = csvRows[r].split(',');
                    allDates.push(colData[1]);
                    allAdjPrices.push(colData[6]);
                }
                this.setState({
                    dates: allDates,
                    adjPrices: allAdjPrices
                });
            }
        }else{
            alert('Please select a time series .csv file');
            document.getElementById('series_csv_select').value = '';
            return;
        }
    };

    render(){
        return(
            <div id='series_wrap'>
                <br />
                <div id='series_input'>
                    <h2>Select TimeSeries .csv file to view:</h2>
                    <input id='series_csv_select' type='file' accept='.csv' onChange={this.handleSeriesCsvSelect} />
                </div>
                <br />
                <div id='series_plot'>
                    <Plot 
                        data={[{
                            x: this.state.dates,
                            y: this.state.adjPrices, 
                            type: 'scatter'}]} 
                        layout={{
                            xaxis: {
                              title: 'Date'},
                            yaxis : {
                              type: 'log',
                              autorange: true,
                              title: 'Adj. Close ($, Log Scale)'},
                            width: 950,
                            height: 675,
                            title: 'Time Series'}} 
                        config={{
                            responsive: true}}
                    />
                </div>
            </div>
        );
    }
}