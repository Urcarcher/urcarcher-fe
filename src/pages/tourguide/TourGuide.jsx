import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import CardOverlay from '../../bootstrap-template/components/cards/CardOverlay';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

function TourGuide({
  numOfRows = '10',
  MobileOS = 'ETC',
  MobileApp = 'AppTest',
  _type = 'json',
  listYN = 'Y',
  sigunguCode,
  cat1,
  cat2,
  cat3,
  modifiedtime
}) {
  const { areaCode, contentTypeId } = useParams();

  const [tourData, setTourData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [arrange, setArrange] = useState('R');

  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/tour/tour-info', {
          params: {
            numOfRows,
            pageNo,
            MobileOS,
            MobileApp,
            _type,
            listYN,
            arrange,
            contentTypeId,
            areaCode,
            sigunguCode,
            cat1,
            cat2,
            cat3,
            modifiedtime
          }
        });
        console.log(response.data);
        const newItems = response.data.response?.body?.items?.item || [];
        setTourData(prevData => [...prevData, ...newItems]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageNo, arrange, numOfRows, MobileOS, MobileApp, _type, listYN, contentTypeId, areaCode, sigunguCode, cat1, cat2, cat3, modifiedtime]);

  useEffect(() => {
    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        setPageNo(prevPageNo => prevPageNo + 1);
      }
    };

    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <h1>Tour Information</h1>
      
      <ButtonGroup className="mb-3">
        <ToggleButton
          type="radio"
          variant={arrange === 'R' ? 'primary' : 'outline-secondary'}
          name="arrange"
          value="R"
          checked={arrange === 'R'}
          onClick={() => {
            setPageNo(1);
            setTourData([]);
            setArrange('R');
          }}
        >
          생성일순
        </ToggleButton>
        <ToggleButton
          type="radio"
          variant={arrange === 'Q' ? 'primary' : 'outline-secondary'}
          name="arrange"
          value="Q"
          checked={arrange === 'Q'}
          onClick={() => {
            setPageNo(1);
            setTourData([]);
            setArrange('Q');
          }}
        >
          수정일순
        </ToggleButton>
        <ToggleButton
          type="radio"
          variant={arrange === 'O' ? 'primary' : 'outline-secondary'}
          name="arrange"
          value="O"
          checked={arrange === 'O'}
          onClick={() => {
            setPageNo(1);
            setTourData([]);
            setArrange('O');
          }}
        >
          제목순
        </ToggleButton>
      </ButtonGroup>
      
      <div  className="scrollable-content" style={{ maxHeight: '800px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
      <ul style={{ padding: '0', listStyleType: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {tourData.map((item) => (
          <li key={item.contentid} style={{ margin: '15px 15px'}}>
            <Link to={`/detail/${contentTypeId === '39' ? 'restaurant':'tour'}/${item.contentid}`}>
              <CardOverlay 
                className="my-custom-class" 
                img={item.firstimage} 
                title={'장소 : ' + item.title} 
                text={'주소 : ' +item.addr1}
                style={{
                  background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 100%)", 
                  color: "white", 
                  padding: "10px",
                  position: "absolute",
                  margin: 0,
                  width: "100%",
                  borderRadius: "0 0 10px 10px"}}
              />
            </Link>
          </li>
        ))}
      </ul>
      <div ref={loaderRef}>
        {loading && <p>Loading...</p>}
      </div>
      </div>
    </div>
  );
}

export default TourGuide;
