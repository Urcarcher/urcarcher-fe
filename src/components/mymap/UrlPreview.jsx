import axios from 'axios';
import { useEffect, useState } from 'react';

function UrlPreview({url}) {
    const [metaData, setMetaData] = useState(null);

    useEffect(() => {
        //url 가공을 위해 서버에 다녀옴
        if(url){
            console.log(url)
            axios.get(`/api/preview/url?url=${encodeURIComponent(url)}`)
            .then(response => setMetaData(response.data))
            .catch(error => console.error('Error fetching URL preview', error));
        }

    }, []);

    useEffect(()=>{
        console.log(metaData)
    }, [metaData]);

    if (!metaData) return <p>Loading preview...</p>;

    return (
        <div className="url-preview">
            <div>
                {metaData.imageUrl && <img src={metaData.imageUrl} style={{width: '100%'}} />}
            </div>
        </div>
    );
}

export default UrlPreview;