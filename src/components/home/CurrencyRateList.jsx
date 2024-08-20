import React from 'react';

function CurrencyRateList(props) {
    return (
        <div>
            <ul className='rate-list'>
                <li>
                    <div>
                        <p><span className='country'>일본 JPY</span>929.22</p>
                    </div>
                    <p>▲12.13 +1.32%</p>
                </li>
                <li>
                    <div>
                        <p><span className='country'>일본 JPY</span>929.22</p>
                    </div>
                    <p>▲12.13 +1.32%</p>
                </li>
            </ul>
        </div>
    );
}

export default CurrencyRateList;