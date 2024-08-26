import React, { useEffect, useState } from 'react';
import { options } from 'services/CommonService';
import axios from 'axios';
import Graph from 'components/exchange/ForecastedGraph';

function Test(props) {

    return (
        <div className='contents'>
            <Graph />
        </div>
    );
}

export default Test;