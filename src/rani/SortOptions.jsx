import React from 'react';
import './SortOptions.css';

const SortOptions = ({ setSortOption }) => {
    return (
        <div className="sort-options">
            <button onClick={() => setSortOption('최신순')}>최신순</button>
            <span>|</span>
            <button onClick={() => setSortOption('조회순')}>조회순</button>
            <span>|</span>
            <button onClick={() => setSortOption('인증순')}>인증순</button>
        </div>
    );
};

export default SortOptions;
