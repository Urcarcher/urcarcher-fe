import React, { useState, useEffect } from 'react';
import { XMLParser } from 'fast-xml-parser';

function ReservationInfo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/reservation/reservation-info', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/xml',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const xmlText = await response.text(); // XML 데이터를 문자열로 읽어옴
        const parser = new XMLParser();
        const jsonObj = parser.parse(xmlText);
        setData(jsonObj);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="contents">
      <h1>리스트</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default ReservationInfo;
