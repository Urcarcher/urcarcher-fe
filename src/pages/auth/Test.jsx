import React, { useEffect, useState } from 'react';
import { options } from 'services/CommonService';
import axios from 'axios';
import RateGraph from 'components/exchange/ForecastedGraph';

function Test(props) {

    function showRateHandle() {

    }

    return (
        <div className='contents'>
            <RateGraph onClick={showRateHandle} />
        </div>
    );
}

export default Test;