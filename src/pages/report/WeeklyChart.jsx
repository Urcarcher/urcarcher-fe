import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import '../../assets/WeeklyChart.css';
import axios from 'axios';

const initialData = [
  ["요일", "소비 금액", { role: "style" }, { role: "annotation" }],
  ["Sat", 0, "#EDF0F7", "0원"],
  ["Sun", 0, "#EDF0F7", "0원"],
  ["Mon", 0, "#EDF0F7", "0원"],
  ["Tue", 0, "#EDF0F7", "0원"],
  ["Wed", 0, "#EDF0F7", "0원"],
  ["Thu", 0, "#EDF0F7", "0원"],
  ["Fri", 0, "#EDF0F7", "0원"]
];

const options = {
  title: "",
  hAxis: {
    gridlines: { color: 'transparent' },
    baselineColor: 'transparent'
  },
  vAxis: {
    gridlines: { color: 'transparent' },
    baselineColor: 'transparent',
    textPosition: 'none'
  },
  legend: "none",
  bar: { groupWidth: "80%" },
  isStacked: true,
  animation: {
    startup: true,
    easing: 'inAndOut',
    duration: 1000,
  },
  chartArea: {
    width: '90%',
    height: '70%',
    left: '5%' // 차트를 왼쪽으로 이동
  },
  annotations: {
    alwaysOutside: true,
    textStyle: {
      fontSize: 14,
      auraColor: 'none',
      color: '#000'
    },
    stem: {
      color: 'transparent'
    }
  }
};

const getWeekOfMonth = (date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return Math.ceil((date.getDate() + firstDay) / 7);
};

const WeeklyChart = () => {
  const [usage, setUsage] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [data, setData] = useState(initialData); // 초기 데이터 설정
  const [selectedMonthWeek, setSelectedMonthWeek] = useState(() => {
    const today = new Date();
    const month = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;
    const week = getWeekOfMonth(today);
    return `${month}-W${week}`;
  });
  const [filteredUsage, setFilteredUsage] = useState([]); // 필터링된 데이터를 저장할 상태 추가
  const [filter, setFilter] = useState("total"); // 추가된 필터 상태

  useEffect(() => {
    axios.get('/api/payment/list')
      .then(response => {
        console.log(response.data);
        setUsage(response.data);
      })
      .catch(error => {
        console.log('에러에러', error);
      });
  }, []);

  useEffect(() => {
    // 선택한 월과 주의 데이터 필터링
    const [selectedMonth, selectedWeek] = selectedMonthWeek.split('-W');
    const filteredData = usage.filter(item => {
      const date = new Date(item.paymentDate);
      const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      const week = getWeekOfMonth(date);
      return month === selectedMonth && week.toString() === selectedWeek;
    });

    // 요일별 소비 금액 집계
    const dayTotals = filteredData.reduce((acc, curr) => {
      const date = new Date(curr.paymentDate);
      const day = date.getDay(); // 0 (일요일)부터 6 (토요일)까지 반환
      acc[day] = (acc[day] || 0) + curr.paymentPrice;
      return acc;
    }, {});

    // 초기 데이터 복사 및 업데이트
    const newData = initialData.map((item, index) => {
      if (index === 0) return item;
      const dayIndex = index - 1;
      const dayTotal = dayTotals[dayIndex] || 0;
      return [item[0], dayTotal, item[2], `${dayTotal}원`];
    });

    // 가장 높은 값을 찾아 색상 변경
    const maxIndex = newData.reduce((maxIdx, row, idx, arr) => row[1] > arr[maxIdx][1] ? idx : maxIdx, 1);
    newData[maxIndex][2] = "#476EFF";

    setData(newData);
    setFilteredUsage(filteredData); // 필터링된 데이터를 설정

    // 주간 총 소비 금액 계산
    const totalWeekPrice = filteredData.reduce((acc, curr) => acc + curr.paymentPrice, 0);
    setTotalPrice(totalWeekPrice);
  }, [selectedMonthWeek, usage]);

  // 2024년 1월부터 현재 월까지의 옵션 생성
  const generateMonthWeekOptions = () => {
    const options = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    if (currentYear !== 2024) return options;
    const currentMonth = currentDate.getMonth() + 1;
    for (let month = currentMonth; month >= 1; month--) {
      const monthValue = `2024-${month.toString().padStart(2, '0')}`;
      for (let week = 1; week <= 5; week++) { // 최대 5주까지 가능
        options.push(
          <option key={`${monthValue}-W${week}`} value={`${monthValue}-W${week}`}>
            2024년 {month}월 {week}주
          </option>
        );
      }
    }
    return options;
  };

  // 필터링된 데이터 반환
  const getFilteredUsageByFilter = () => {
    if (filter === "income") {
      return filteredUsage.filter(item => item.paymentPrice > 0);
    } else if (filter === "expense") {
      return filteredUsage.filter(item => item.paymentPrice < 0);
    } else {
      return filteredUsage; // 총 지출 (모든 데이터)
    }
  };

  return (
    <div  className="scrollable-content" style={{ maxHeight: '800px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
    <div className="chart-container" style={{ marginTop: '100px', marginBottom: '100px' }}>
      <div style={{ justifyContent: 'flex-start', display: 'flex', margin: '10px 20px', fontSize: '20px', position: 'relative' }}>
        <select
          value={selectedMonthWeek}
          onChange={(e) => setSelectedMonthWeek(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            backgroundPositionX: '5px', // 화살표를 왼쪽으로 이동
          }}>
          {generateMonthWeekOptions()}
        </select>
        차 사용 금액
      </div>
      <div style={{ justifyContent: 'flex-start', display: 'flex', margin: '8px 20px', color: '#064AFF', fontWeight: 'bolder', fontSize: '25px' }}>
        {totalPrice.toLocaleString()}원
      </div>
      <Chart
        chartType="ColumnChart"
        height="450px"
        data={data}
        options={options}
        loader={<div>Loading Chart...</div>}
      />

      {/* 필터 버튼 대신 텍스트로 */}
      <div style={{ display: 'flex', gap: '15px', margin: 'auto 20px' }}>
        <span 
          onClick={() => setFilter("total")} 
          style={{
            cursor: 'pointer',
            color: filter === "total" ? '#064AFF' : '#000',
            fontWeight: filter === "total" ? 'bold' : 'normal'
          }}
        >
          총 지출
        </span>
        <span 
          onClick={() => setFilter("income")} 
          style={{
            cursor: 'pointer',
            color: filter === "income" ? '#064AFF' : '#000',
            fontWeight: filter === "income" ? 'bold' : 'normal'
          }}
        >
          입금
        </span>
        <span 
          onClick={() => setFilter("expense")} 
          style={{
            cursor: 'pointer',
            color: filter === "expense" ? '#064AFF' : '#000',
            fontWeight: filter === "expense" ? 'bold' : 'normal'
          }}
        >
          출금
        </span>
      </div>

      {/* 결제내역 */}
      {
    getFilteredUsageByFilter().map((usage, index) => {
        return (
            <div style={{ display: 'flex', margin: '25px 20px', justifyContent: 'space-between', alignItems: 'center' }} key={index}>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <img src={require('../../assets/Arrow2.png')} alt='' />
                </div>
                <div style={{ flex: 1, marginLeft: '20px' }}>  {/* flex: 1로 너비를 지정하여 가운데로 배치 */}
                    <div style={{ fontWeight: 'bold', textAlign: 'start' }}>{usage.storeName}</div>
                    <div style={{textAlign: 'start'}}>{new Date(usage.paymentDate).toLocaleString()}</div>
                </div>
                <div style={{ fontWeight: 'bold', color: '#064AFF' }}>{usage.paymentPrice}원</div>
            </div>
        );
    })
}

    </div>
    </div>
  );
};

export default WeeklyChart;
