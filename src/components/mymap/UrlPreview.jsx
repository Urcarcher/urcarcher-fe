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
            <div
                style={{
                    width: '100%',
                    backgroundColor: metaData.imageUrl ? 'transparent' : '#f0f0f0', // imageUrl이 없을 때 배경색 설정
                    borderRadius: '10px 10px 0 0',
                    minHeight: '150px', // 이미지 영역의 최소 높이 설정
                }}
            >
                {/* {metaData.imageUrl && <img src={metaData.imageUrl} style={{width: '100%', borderRadius: '10px 10px 0 0'}} />} */}
                <img
                    src={metaData.imageUrl || ""}
                    style={{
                        width: '100%',
                        borderRadius: '10px 10px 0 0',
                        minHeight: '150px', // 이미지 영역의 최소 높이 설정
                        display: metaData.imageUrl ? 'block' : 'none' // imageUrl이 없을 때 img 태그 숨기기
                    }}
                    alt="Preview"
                />
            </div>
        </div>
    );
}

export default UrlPreview;