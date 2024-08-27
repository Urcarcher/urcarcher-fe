import React, { useState, useEffect } from 'react';
import "./reservation.css";
import LoadingSpinner from 'components/LoadingSpinner';
import { Link } from 'react-router-dom';

function ReservationInfo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/reservation/reservation-info', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // if (loading) return <div className="contents"><p>Loading...</p></div>;
  if (loading) return <LoadingSpinner />;
  if (error) return <div className="contents"><p>Error: {error}</p></div>;

  return (
    <div className="reserve-contents contents">
      <h1>공연 리스트</h1>
      <div className='reserve-list-wrap'>
      <div className="row">
        {data?.db.map((item) => (
          <div key={item.mt20id} className="col-lg-3 col-md-6 mb-4">
            <Link to={`./detail/${item.mt20id}`}>
            <div className="reserve-card">
              <img className="reserve-card-img-top rounded-0" src={item.poster} alt={`${item.prfnm} 포스터`} />
              <div className="reserve-card-body">
                <h5 className="reserve-card-title">{item.prfnm}</h5>
                <h6 className="reserve-card-subtitle mb-2 text-muted">{item.genrenm}</h6>
                <p className="reserve-card-text date">{item.prfpdfrom} ~ {item.prfpdto}</p>
                <p className="reserve-card-text venue">{item.fcltynm}</p>
                <p className="reserve-card-text status">{item.prfstate}</p>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default ReservationInfo;

