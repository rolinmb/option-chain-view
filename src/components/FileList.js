import React, { Component } from 'react';
import { storage } from '../firebase';
import { ref, getDownloadURL, listAll } from 'firebase/storage';

export class FileList extends Component{
    constructor(props){
        super(props);
        this.state = {
            pngUrls: []
        };
    }

    async componentDidMount() {
        await this.fetchAvailablePngs();
        this.refreshInterval = setInterval(this.fetchPngUrls, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.refreshInterval);
    }

    fetchAvailablePngs = async () => {
        try{
            const storageRef = ref(storage, 'png_files');
            const listResult = await listAll(storageRef);
            const fresh_list = await Promise.all(
                listResult.items.map((item) => getDownloadURL(item)));
            for(let i = 0; i < fresh_list.length; i++){
                fresh_list[i] = fresh_list[i].split('_')[1].replace('files%2F','')+' '+fresh_list[i].split('_')[2];
            }
            this.setState({ pngUrls: fresh_list });
        }catch(err){
            console.error('Error retrieving .png files from Firebase Cloud Storage:', err);
            this.setState({ pngUrls: [] });
        }
    };

    render(){
        const { pngUrls } = this.state;
        return(
            <div id='png_list_wrap' style={{ paddingTop: '20px', width: '300px',  height: '420px', overflowY: 'auto', margin: 'auto' }}>
                <h2>Available .png files in Firebase Cloud Storage:</h2>
                <ul id='png_file_list'>
                    {pngUrls.map((pngUrl, index) => (
                        <li key={index}>{pngUrl}</li>))}
                </ul>
            </div>
        );
    }
}