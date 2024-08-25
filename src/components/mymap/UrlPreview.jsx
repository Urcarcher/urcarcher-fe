import axios from 'axios';
import { useEffect, useState } from 'react';

function UrlPreview({url}) {
    const [metaData, setMetaData] = useState(null);

    //url 가공을 위해 서버에 다녀옴
    useEffect(() => {
        if(url){
            axios.get(`/api/preview/url?url=${encodeURIComponent(url)}`)
            .then(response => {
                setMetaData(response.data)
            })
            .catch(error =>{ 
                console.error('Error fetching URL preview', error)
            });
        }
    }, [url]); // URL이 없는 경우에도 로딩 종료

    useEffect(()=>{
        //console.log(metaData)
    }, [metaData]);

    //데이터 없는 경우 (대체 이미지 src로 수정 필요)
    if (!metaData) return <p>Loading preview</p>; 

    return (
        <div className="url-preview">
            <div>
                {metaData.imageUrl && <img src={metaData.imageUrl} style={{width: '100%', borderRadius: '10px 10px 0 0'}} />}
            </div>
        </div>
    );
}

export default UrlPreview;