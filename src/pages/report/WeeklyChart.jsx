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
  title: "주간 소비 리포트",
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
    height: '70%'
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
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;
  });
  const [selectedWeek, setSelectedWeek] = useState("1");
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
      return [item[0], 0, item[2], "0원"];
    });

    let cumulativeTotal = 0;
    Object.keys(dayTotals).forEach(day => {
      cumulativeTotal += dayTotals[day];
      newData[parseInt(day) + 1][1] = cumulativeTotal;
      newData[parseInt(day) + 1][3] = `${cumulativeTotal}원`;
    });

    // 가장 높은 값을 찾아 색상 변경
    const maxIndex = newData.reduce((maxIdx, row, idx, arr) => row[1] > arr[maxIdx][1] ? idx : maxIdx, 1);
    newData[maxIndex][2] = "#476EFF";

    setData(newData);
    setFilteredUsage(filteredData); // 필터링된 데이터를 설정

    // 주간 총 소비 금액 계산
    const totalWeekPrice = filteredData.reduce((acc, curr) => acc + curr.paymentPrice, 0);
    setTotalPrice(totalWeekPrice);
  }, [selectedMonth, selectedWeek, usage]);

  // 2024년 1월부터 현재 월까지의 옵션 생성
  const generateMonthOptions = () => {
    const options = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    if (currentYear !== 2024) return options;
    const currentMonth = currentDate.getMonth() + 1;
    for (let month = currentMonth; month >= 1; month--) {
      const value = `2024-${month.toString().padStart(2, '0')}`;
      options.push(<option key={value} value={value}>2024년 {month}월</option>);
    }
    return options;
  };

  // 첫째주부터 다섯째주까지의 옵션 생성
  const generateWeekOptions = () => {
    const weekNames = ["첫째주", "둘째주", "셋째주", "넷째주", "다섯째주"];
    return weekNames.map((name, index) => (
      <option key={index + 1} value={index + 1}>{name}</option>
    ));
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
    <div className="chart-container">
      <div>
        <label>월 선택: </label>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          {generateMonthOptions()}
        </select>
        <label>주 선택: </label>
        <select value={selectedWeek} onChange={(e) => setSelectedWeek(e.target.value)}>
          {generateWeekOptions()}
        </select>
      </div>
      <h2>{selectedMonth.replace('-', '년 ')} {generateWeekOptions().find(option => option.props.value.toString() === selectedWeek).props.children} 주간 소비 리포트</h2> {/* 선택한 년도, 월 및 주 표시 */}
      <Chart
        chartType="ColumnChart"
        width="460px"
        height="460px"
        data={data}
        options={options}
        loader={<div>Loading Chart...</div>}
      />
      <div>주간 총 소비 금액: {totalPrice.toLocaleString()}원</div>  

      {/* 필터 버튼 */}
      <div>
        <button onClick={() => setFilter("total")}>총 지출 내역</button>
        <button onClick={() => setFilter("income")}>입금 내역</button>
        <button onClick={() => setFilter("expense")}>출금 내역</button>
      </div>

      {/* 결제내역 */}
      {
        getFilteredUsageByFilter().map((usage, index) => {
          return (
            <div key={index}>
              <div>가맹점이름: {usage.storeName}</div>
              <div>결제금액 : {usage.paymentPrice}</div>
              <div>결제날짜 : {new Date(usage.paymentDate).toLocaleString()}</div>
              <p></p>
              <br/>
            </div>
          );
        })
      }
    </div>
  );
};

export default WeeklyChart;
