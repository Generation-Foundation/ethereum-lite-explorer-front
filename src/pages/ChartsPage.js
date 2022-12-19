/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HighChart from "../components/HighChart";
import { dbChartAllTxsByDate } from "../redux/action/dbChartAllTxsByDate";
import "./ChartsPage.css";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { dbChartMonthlyTxsByDate } from "../redux/action/dbChartMonthlyTxsByDate";
import { dbChartWeeklyTxsByDate } from "../redux/action/dbChartWeeklyByDate";
const { RangePicker } = DatePicker;

const ChartsPage = () => {
  const dispatch = useDispatch();
  const { chartAllTxsByDate, chartMonthlyTxsByDate, chartWeeklyTxsByDate } =
    useSelector((state) => state.chartData);

  useEffect(() => {
    dispatch(dbChartAllTxsByDate.dbChartAllTxsByDateApi());
  }, []);

  // rangePick로 날짜선택할 때 필요한 상태값
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  // 날짜 단위별로 버튼 클릭 시 boolean값을 통해서 highChart컴포넌트에 넘겨주는 데이터를 구분하기 위한 상태값
  const [chartMonthData, setChartMonthDate] = useState(false);
  const [chartWeekData, setChartWeekData] = useState(false);

  // 처음 날짜와 끝 날짜 선택 시 실행되는 함수
  const onChangeDate = (value) => {
    setChartWeekData(false);
    setChartMonthDate(false);
    dispatch(dbChartAllTxsByDate.dbChartAllTxsByDateApi());
    setStartDate(dayjs(value[0].$d).format("YYYY-MM-DD"));
    setEndDate(dayjs(value[1].$d).format("YYYY-MM-DD"));
  };

  // 처음 코인 발생한 날짜 이전과 오늘 이후 날짜들은 정보가 없기 때문에 선택을 막는 함수
  const disabledDate = (current) => {
    const currentDay = `${dayjs(current.$d).format("YYYY-MM-DD")} 09:00:00`;
    const fristDay = "2022-08-01 00:00:00";
    const todayDay = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

    if (currentDay > todayDay || currentDay < fristDay) {
      return true;
    }
  };

  // 기간별 버튼 클릭 시 실행되는 함수
  const onClickChartBtn = (e) => {
    if (e.target.innerText === "1week") {
      setStartDate();
      setEndDate();
      dispatch(dbChartWeeklyTxsByDate.dbChartWeeklyTxsByDateApi());
      setChartMonthDate(false);
      setChartWeekData(true);
    }
    if (e.target.innerText === "1month") {
      setStartDate();
      setEndDate();
      dispatch(dbChartMonthlyTxsByDate.dbChartMonthlyTxsByDateApi());
      setChartWeekData(false);
      setChartMonthDate(true);
    }
    if (e.target.innerText === "all") {
      setStartDate();
      setEndDate();
      dispatch(dbChartAllTxsByDate.dbChartAllTxsByDateApi());
      setChartWeekData(false);
      setChartMonthDate(false);
    }
  };

  return (
    <div className="chartContainer">
      <div className="title">
        <h1>Chart</h1>
      </div>
      <div className="chart">
        <div className="chartSelect">
          <div className="chartBtnContainer">
            <div className="chartBtn" onClick={onClickChartBtn}>
              1week
            </div>
            <div className="chartBtn" onClick={onClickChartBtn}>
              1month
            </div>
            <div className="chartBtn" onClick={onClickChartBtn}>
              all
            </div>
          </div>
          <div>
            <RangePicker
              format={"YYYY-MM-DD"}
              onChange={onChangeDate}
              disabledDate={disabledDate}
            />
          </div>
        </div>
        <HighChart
          data={
            chartMonthData
              ? chartMonthlyTxsByDate
              : chartWeekData
              ? chartWeeklyTxsByDate
              : chartAllTxsByDate
          }
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </div>
  );
};

export default ChartsPage;
