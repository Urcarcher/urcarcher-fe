import React from 'react';

function RegionList({ regions, handleRegionClick }) {
    return (
        <ul className="region-list">
            {regions.map((region) => (
                <li key={region} onClick={() => handleRegionClick(region)} className="region-item">
                    {region}
                </li>
            ))}
        </ul>
    );
}

export default RegionList;
