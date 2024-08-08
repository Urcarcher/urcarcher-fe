import React from 'react';

const MapEmbed = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <iframe
  src="https://storage.googleapis.com/maps-solutions-gkbtjlne0h/commutes/3l1n/commutes.html"
  width="500px"
  height="500px"
  style={{ border: '0' }}
  loading="lazy"
  title="Embedded Map"
  allow="geolocation; microphone; camera"
/>

    </div>
  );
};

export default MapEmbed;
