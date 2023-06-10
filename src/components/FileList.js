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
        await this.fetchPngUrls();
        this.refreshInterval = setInterval(this.fetchPngUrls, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.refreshInterval);
    }

    fetchPngUrls = async () => {
        try{
            const storageRef = ref(storage, 'png_files');
            const listResult = await listAll(storageRef);
            const fresh_urls = await Promise.all(
                listResult.items.map((item) => getDownloadURL(item)));
            this.setState({ pngUrls: fresh_urls });
        }catch(err){
            console.error('Error retrieving .png files from Firebase Cloud Storage:', err);
            this.setState({ pngUrls: [] });
        }
    };

    render(){
        const { pngUrls } = this.state;
        return(
            <div id='png_list_wrap'>
                <h2>Firebase Cloud Storage Bucket Contents:</h2>
                <ul id='png_file_list'>
                    {pngUrls.map((pngUrl, index) => (
                        <li key={index}>{pngUrl}</li>))}
                </ul>
            </div>
        );
    }
}