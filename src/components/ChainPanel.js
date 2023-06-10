import React, { Component } from 'react';
import Plot from 'react-plotly.js';

export class ChainPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            chainData: []
        }
    }

    handleChainCsvSelect = (e) => {
        const files = e.target.files || e.dataTransfer.files;
        if(files.length > 0){
            const file = files[0];
            if(!file.name.includes('_chain.csv')){
                alert('Please select a .csv file with name format: %TICKER%_chain.csv');
                document.getElementById('chain_csv_select').value = '';
                return;
            }
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (event) => {
                const csvData = event.target.result;
                const csvRows = csvData.split('\n');
                var allData = [];
                for(let r = 1; r < csvRows.length; r++){
                    if(csvRows[r].split(',').length === 1 && csvRows[r].split(',')[0].trim() === ''){
                        continue;
                    }
                    allData.push(csvRows[r]);
                }
                this.setState({
                    chainData: allData
                });
            };
        }else{
            alert('Please select an option chain .csv file');
            document.getElementById('chain_csv_select').value = '';
            return;
        }
    };
    
    render(){
        const { chainData } = this.state;
        let xData = [];
        let yData = [];
        let zData = [];
        for(let i = 0; i < chainData.length; i++){
            const columns = chainData[i].split(',');
            const yte = parseFloat(columns[3]);
            const strike = parseFloat(columns[6]);
            const zVal = parseFloat(columns[chainData.length-1]);
            xData.push(yte);
            yData.push(strike);
            zData.push(zVal);
        }

        const combinedData = [{
            x: xData,
            y: yData,
            z: zData,
            mode: 'markers',
            marker: {
                size: 3
            },
            type: 'scatter3d'
        }];
        
        const plotLayout = {
            margin: {
                l: 0,
                r: 0,
                b: 0,
                t: 0
            },
            scene: {
                webgl: true
            },
        };

        return(
            <div id='chain_wrap'>
                <div id='chain_input'>
                    <h2>Selected Option Chain:</h2>
                    <input id='chain_csv_select' type='file' accepts='.csv' onChange={this.handleChainCsvSelect} />
                </div>
                <div id='chain_display'>
                    <table id='chain_table' border="1" style={{borderCollapse: 'collapse'}}>
                        <thead>
                            <tr>
                                <th>Ticker</th>
                                <th>Div. Yield</th>
                                <th>Historical Volatility</th>
                                <th>YTE</th>
                                <th>Expiry</th>
                                <th>Strike Price</th>
                                <th>cLast</th>
                                <th>cBid</th>
                                <th>cMid</th>
                                <th>cAsk</th>
                                <th>cTheoVal</th>
                                <th>cTheoDif</th>
                                <th>cChange</th>
                                <th>cVol</th>
                                <th>cOpen Int.</th>
                                <th>c&sigma;</th>
                                <th>cMid &sigma;</th>
                                <th>c&Delta;</th>
                                <th>c&lambda;</th>
                                <th>cVega</th>
                                <th>c&rho;</th>
                                <th>c&epsilon;</th>
                                <th>c&Theta;</th>
                                <th>c&Gamma;</th>
                                <th>cVanna</th>
                                <th>cCharm</th>
                                <th>cVomma</th>
                                <th>cVeta</th>
                                <th>cSpeed</th>
                                <th>cZomma</th>
                                <th>cColor</th>
                                <th>cUltima</th>
                                <th>pLast</th>
                                <th>pBid</th>
                                <th>pMid</th>
                                <th>pAsk</th>
                                <th>pTheoVal</th>
                                <th>pTheoDif</th>
                                <th>pChange</th>
                                <th>pVol</th>
                                <th>pOpen Int.</th>
                                <th>p&sigma;</th>
                                <th>pMid &sigma;</th>
                                <th>p&Delta;</th>
                                <th>p&lambda;</th>
                                <th>pVega</th>
                                <th>p&rho;</th>
                                <th>p&epsilon;</th>
                                <th>p&Theta;</th>
                                <th>p&Gamma;</th>
                                <th>pVanna</th>
                                <th>pCharm</th>
                                <th>pVomma</th>
                                <th>pVeta</th>
                                <th>pSpeed</th>
                                <th>pZomma</th>
                                <th>pColor</th>
                                <th>pUltima</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chainData.map((row, rIndex) => {
                                var cells = row.split(',');
                                var tableCells = [];
                                for(let cIndex = 0; cIndex < cells.length; cIndex++){
                                    if(cIndex === 4){
                                        tableCells.push(<td key={cIndex}>{cells[cIndex]+' '+cells[cIndex+1]}</td>);
                                        cIndex++;
                                        continue;
                                    }else{
                                        tableCells.push(<td key={cIndex}>{cells[cIndex]}</td>);
                                    }
                                }    
                                return <tr key={rIndex}>{tableCells}</tr>;
                            })}
                        </tbody>
                    </table>
                    <h2>Selected Option Chain Surface Plot:</h2>
                    <Plot data={combinedData} layout={plotLayout} />
                    <h2>Selected Option Chain .csv raw:</h2>
                    <ul id='chain_raw'>
                        {this.state.chainData.map((elem, index) => (<li key={index}>{elem}</li>))}
                    </ul>
                </div>
            </div>
        );
    }
}