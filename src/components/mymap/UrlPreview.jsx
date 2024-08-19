import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UrlPreview({url}) {
    const [metaData, setMetaData] = useState(null);

    // useEffect(() => {
    //     if(url){
    //         console.log(url)
    //         axios.get(`/api/preview/url?url=${encodeURIComponent(url)}`)
    //         .then(response => setMetaData(response.data))
    //         .catch(error => console.error('Error fetching URL preview', error));
    //     }

    // }, []);

    if (!metaData) return <p>Loading preview...</p>;

    return (
        <div className="url-preview">
            {metaData.imageUrl && <img src={metaData.imageUrl} alt={metaData.title} style={{ width: '100px' }} />}
            <div>
                <img src={metaData.imageUrl} alt={metaData.title} style={metaData.style} />
                <p>{metaData.style}</p>
                <h3>{metaData.title} - 파싱한 이름</h3>
                {/* <p>{metaData.description}</p> */}
                {/* <a href={metaData.pageUrl} target="_blank" rel="noopener noreferrer">상세페이지 이동</a> */}
            </div>
        </div>
    );
}

export default UrlPreview;