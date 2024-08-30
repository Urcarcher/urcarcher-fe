import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';

// Styled Components 정의
const StyledRow = styled.div``;
const StyledCol = styled.div``;
const Header = styled.h2``;
const TimeSelect = styled.div``;
const CustomButton = styled.button``;

const MyComponent = () => {
  // 샘플 데이터
  const prfpdfrom = "2024.08.29";
  const prfpdto = "2024.09.07";
  const dtguidance = "수요일 ~ 금요일(20:00,21:00), 토요일(13:30,18:30,20:00), 월요일(15:00)";
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState({});

  useEffect(() => {
    // 날짜 범위 생성
    const startDate = new Date(prfpdfrom.replaceAll('.', '-'));
    const endDate = new Date(prfpdto.replaceAll('.', '-'));

    const dates = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    setAvailableDates(dates);

    // dtguidance에서 요일별 시간을 파싱하여 사용 가능한 시간 설정
    const times = {};
    const dayMap = {
      '일요일': 0,
      '월요일': 1,
      '화요일': 2,
      '수요일': 3,
      '목요일': 4,
      '금요일': 5,
      '토요일': 6,
    };

    // dtguidance를 ')으로 나누고 각 부분을 처리
    dtguidance.split('),').forEach((entry, idx) => {
      // '), '로 분리된 각 부분에서 ')'을 제거
      const cleanedEntry = idx === dtguidance.split('),').length - 1 ? entry : entry + ')';
      
      // 괄호와 요일 부분을 분리
      const [daysPart, timesPart] = cleanedEntry.split('(');
      const dayRange = daysPart.trim();
      const timeValues = timesPart ? timesPart.replace(')', '').split(',').map(time => time.trim()) : [];

      console.log(`Parsing entry: ${cleanedEntry.trim()}`);
      console.log(`Days: ${dayRange}`);
      console.log(`Times: ${timeValues.join(', ')}`);

      const [startDay, endDay] = dayRange.split('~').map(day => day.trim());
      const startIdx = dayMap[startDay];
      const endIdx = endDay ? dayMap[endDay] : startIdx;

      for (let i = startIdx; i <= endIdx; i++) {
        const dayKey = Object.keys(dayMap).find(key => dayMap[key] === i);
        if (dayKey) {
          times[dayKey] = times[dayKey] ? [...new Set([...times[dayKey], ...timeValues])] : [...timeValues];
        }
      }
    });

    console.log('Available Times:', times);
    setAvailableTimes(times);

  }, [prfpdfrom, prfpdto, dtguidance]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);  // 날짜 변경 시 시간 초기화
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const isDateSelectable = (date) => {
    return availableDates.some(d => d.toDateString() === date.toDateString());
  };

  const getAvailableTimesForSelectedDate = () => {
    const dayOfWeek = selectedDate.toLocaleString('ko-KR', { weekday: 'long' });
    return availableTimes[dayOfWeek] || [];
  };

  return (
    <>
      <StyledRow>
        <StyledCol>
          <Header>날짜를 선택해 주세요</Header>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="react-calendar modern-calendar"
            tileDisabled={({ date }) => !isDateSelectable(date)}
          />
        </StyledCol>
      </StyledRow>
      <StyledRow>
        <StyledCol>
          <Header>시간을 선택해 주세요</Header>
          <TimeSelect>
            {getAvailableTimesForSelectedDate().map((time, index) => (
              <CustomButton
                key={index}
                active={selectedTime === time}
                onClick={() => handleTimeChange(time)}
              >
                {time}
              </CustomButton>
            ))}
          </TimeSelect>
        </StyledCol>
      </StyledRow>
    </>
  );
};

export default MyComponent;
