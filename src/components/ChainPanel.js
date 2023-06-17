import './ChainPanel.css'
import React, { Component } from 'react';
//import { ChainSurface } from './ChainSurface.js';
import { storage } from '../firebase';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import Plot from 'react-plotly.js';

/*var func_names = [
    'TheoDif','IV','MidIV',
    'Delta','Elasticity','Vega','Rho','Epsilon','Theta',
    'Gamma','Vanna','Charm','Vomma','Veta','Speed',
    'Zomma','Color','Ultima'
];
var func_strs = [
    'TheoDif','&sigma;','Mid&sigma;',
    '&Delta;','&lambda;','Vega','&rho;','&epsilon;','&Theta;',
    '&Gamma;','Vanna','Charm','Vomma','Veta','Speed',
    'Zomma','Color','Ultima'
];*/

export class ChainPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            ticker: '',
            chainData: [],
            ytes: [],
            strikes_yte: [],
            call_df: {},
            put_df: {},
            select_method: 'vomma',
            pngUrls: []
        }
    }

    fetchSurfaceImages = async (div) => {
        try{
            const storageRef = ref(storage, 'png_files');
            const listResult = await listAll(storageRef);
            const allUrls = await Promise.all(
                listResult.items.map((item) => getDownloadURL(item)));
            const relevantUrls = allUrls.filter(str => str.includes(this.state.ticker));
            if(relevantUrls.length === 0){
                alert('No .png files available for '+this.state.ticker+' in Firebase Cloud Storage bucket');
            }else if(relevantUrls.length < 18){
                alert('Not all possible .png files have been uploaded to Firebase Cloud Storage for '+this.state.ticker+'; only displaying what was found');
            }
            this.setState({ pngUrls: relevantUrls });
            for(let i = 0; i < relevantUrls.length; i++){
                const calcMethod = relevantUrls[i].split('_')[2];
                var img_header = document.createElement('h3');
                img_header.innerHTML = '$'+this.state.ticker+' Option Chain '+calcMethod+' & '+calcMethod+' Gradient Surfaces';
                div.appendChild(img_header);
                var img_elem = document.createElement('img');
                img_elem.src = relevantUrls[i];
                div.appendChild(img_elem);
            }
        }catch(err){
            console.error('Error retrieving .png filed for '+this.state.ticker+' from Firebase Cloud Storage');
            console.error(err);
            this.setState({ pngUrls: [] });
        }
    };

    handleChainCsvSelect = (e) => {
        var uniqueYtes = [];
        var strikesYte = []; // list of lists
        var call_df = { // each key-value is a list of lists
            theo_dif: [],
            iv: [],
            mid_iv: [],
            delta: [],
            lambda: [],
            vega: [],
            rho: [],
            epsilon: [],
            theta: [],
            gamma: [],
            vanna: [],
            charm: [],
            vomma: [],
            veta: [],
            speed: [],
            zomma: [],
            color: [],
            ultima: []
        };
        var put_df = { // each key-value is a list of lists
            theo_dif: [],
            iv: [],
            mid_iv: [],
            delta: [],
            lambda: [],
            vega: [],
            rho: [],
            epsilon: [],
            theta: [],
            gamma: [],
            vanna: [],
            charm: [],
            vomma: [],
            veta: [],
            speed: [],
            zomma: [],
            color: [],
            ultima: []
        };
        var expNum = 0;
        const files = e.target.files || e.dataTransfer.files;
        if(files.length > 0){
            const file = files[0];
            this.setState({ ticker: file.name.substring(0, file.name.indexOf('_')) });
            if(!file.name.includes('_chain.csv')){
                alert('Please select a .csv file with name format: %TICKER%_chain.csv');
                document.getElementById('chain_csv_select').value = '';
                return;
            }
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (event) => {
                var ticker = file.name.substring(0, file.name.indexOf('_'));
                const csvData = event.target.result;
                const csvRows = csvData.split('\n');
                var allData = [];
                for(let r = 1; r < csvRows.length; r++){
                    var colData = csvRows[r].split(',');
                    if(colData.length === 1 && colData[0].trim() === ''){
                        continue;
                    }
                    allData.push(csvRows[r]);
                    if(!uniqueYtes.includes(colData[3])){
                        expNum++;
                        uniqueYtes.push(colData[3]);
                        strikesYte.push([]);
                        for(let key in call_df){
                            call_df[key].push([]);
                            put_df[key].push([]);
                        }
                    }
                    strikesYte[expNum-1].push(colData[6]);
                    call_df['theo_dif'][expNum-1].push(colData[12]);
                    call_df['iv'][expNum-1].push(colData[16]);
                    call_df['mid_iv'][expNum-1].push(colData[17]);
                    call_df['delta'][expNum-1].push(colData[18]);
                    call_df['lambda'][expNum-1].push(colData[19]);
                    call_df['vega'][expNum-1].push(colData[20]);
                    call_df['rho'][expNum-1].push(colData[21]);
                    call_df['epsilon'][expNum-1].push(colData[22]);
                    call_df['theta'][expNum-1].push(colData[23]);
                    call_df['gamma'][expNum-1].push(colData[24]);
                    call_df['vanna'][expNum-1].push(colData[25]);
                    call_df['charm'][expNum-1].push(colData[26]);
                    call_df['vomma'][expNum-1].push(colData[27]);
                    call_df['veta'][expNum-1].push(colData[28]);
                    call_df['speed'][expNum-1].push(colData[29]);
                    call_df['zomma'][expNum-1].push(colData[30]);
                    call_df['color'][expNum-1].push(colData[31]);
                    call_df['ultima'][expNum-1].push(colData[32]);
                    put_df['theo_dif'][expNum-1].push(colData[38]);
                    put_df['iv'][expNum-1].push(colData[42]);
                    put_df['mid_iv'][expNum-1].push(colData[43]);
                    put_df['delta'][expNum-1].push(colData[44]);
                    put_df['lambda'][expNum-1].push(colData[45]);
                    put_df['vega'][expNum-1].push(colData[46]);
                    put_df['rho'][expNum-1].push(colData[47]);
                    put_df['epsilon'][expNum-1].push(colData[48]);
                    put_df['theta'][expNum-1].push(colData[49]);
                    put_df['gamma'][expNum-1].push(colData[50]);
                    put_df['vanna'][expNum-1].push(colData[51]);
                    put_df['charm'][expNum-1].push(colData[52]);
                    put_df['vomma'][expNum-1].push(colData[53]);
                    put_df['veta'][expNum-1].push(colData[54]);
                    put_df['speed'][expNum-1].push(colData[55]);
                    put_df['zomma'][expNum-1].push(colData[56]);
                    put_df['color'][expNum-1].push(colData[57]);
                    put_df['ultima'][expNum-1].push(colData[58]);
                }
                this.setState({
                    ticker: ticker,
                    chainData: allData,
                    ytes: uniqueYtes,
                    strikes_yte: strikesYte,
                    call_df: call_df,
                    put_df: put_df
                });
            };
        }else{
            alert('Please select an option chain .csv file');
            document.getElementById('chain_csv_select').value = '';
            return;
        }
        // Update 'surfaces_area' <div> from Firebase Cloud Storage matching files
        let imgsArea = document.getElementById('imgs_area');
        if(!imgsArea.hasChildNodes()){
            this.fetchSurfaceImages(imgsArea);
        }else{
            while(imgsArea.firstChild){
                imgsArea.removeChild(imgsArea.firstChild);
            }
            this.fetchSurfaceImages(imgsArea);
        }
    };

    render(){
        const { chainData, ticker, ytes, strikes_yte, call_df, put_df, select_method } = this.state;

        return(
            <div id='chain_wrap' style={{ paddingTop: '20px' }}>
                <div id='chain_input'>
                    <h2>{ticker} Option Chain:</h2>
                    <input id='chain_csv_select' type='file' accepts='.csv' onChange={this.handleChainCsvSelect} />
                </div>
                <div id='chain_display'
                    style={{
                        overflowY: 'auto', margin: 'auto', width: '1333px',
                        height: '400px', overflow: 'auto'
                }}>
                    <table id='chain_table' style={{ border: '1', borderCollapse: 'collapse'}}>
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
                </div>
                <h2>{ticker} Option Chain Surface (w/ Plotly.js):</h2>
                <div id="csurface_area">
                    <Plot 
                        data = {[{
                            type: 'surface',
                            colorscale: 'Electric',
                            x: strikes_yte,
                            y: ytes,
                            z: call_df[select_method],
                        }]}
                        layout={{
                            autosize: false,
                            width: 700,
                            height: 700,
                            title: ticker+" Call "+select_method,
                        }}
                    />
                </div>
                <div id="psurface_area">
                    <Plot 
                        data = {[{
                            type: 'surface',
                            colorscale: 'Electric',
                            x: strikes_yte,
                            y: ytes,
                            z: put_df[select_method],
                        }]}
                        layout={{
                            autosize: false,
                            width: 700,
                            height: 700,
                            title: ticker+" Put "+select_method,
                        }}
                    />
                </div>
                <h2>{ticker} Chain Surface Images (w/ python/matplotlib):</h2>
                <div id='imgs_area'
                    style={{
                        margin: 'auto !important', display: 'flex !important', flexDirection: 'column !important',
                        alignItems:'center !important', height: '300px !important'
                }}>
                </div>
            </div>
        );
    }
}