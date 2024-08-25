import React, { useState, useEffect } from 'react';
import { XMLParser } from 'fast-xml-parser';
import "../signup/signup.css"

function ReservationInfo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const xmlToJson = (xml) => {
    const obj = {};
    if (xml.nodeType === 1) { // Element
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (let j = 0; j < xml.attributes.length; j++) {
          const attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) { // Text
      obj = xml.nodeValue;
    }

  // useEffect(() => {
  //   fetch('https://example.com/data.xml')  // 실제 API 엔드포인트로 변경
  //     .then(response => response.text())
  //     .then(str => {
  //       const parser = new DOMParser();
  //       const xmlDoc = parser.parseFromString(str, "application/xml");
  //       const jsonData = xmlToJson(xmlDoc);
  //       setData(jsonData.dbs.db);
  //     })
  //     .catch(err => console.error('Failed to fetch XML:', err));
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/api/reservation/reservation-info', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/xml',
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       console.log()

  //       const xmlText = await response.text(); // XML 데이터를 문자열로 읽어옴
  //       console.log(xmlText);
  //       const parser = new XMLParser();
  //       const jsonObj = parser.parse(xmlText);
  //       setData(jsonObj);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  if (loading) return <div className="contents"><p>Loading...</p></div>;
  if (error) return <div className="contents"><p>Error: {error}</p></div>;

  return (
    <div className="contents">
      <h1>리스트</h1>
      <div className='reserve-list-wrap'>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
}
export default ReservationInfo;
