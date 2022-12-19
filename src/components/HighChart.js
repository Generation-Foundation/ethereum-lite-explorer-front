import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const HighChart = ({ data, startDate, endDate }) => {
  const dayArray = [];
  const txLengthArray = [];

  // chart데이터가 있을 경우에 실행
  if (data) {
    // 시작날짜와 끝날짜가 있을 경우 원하는 범위에 데이터를 가공하는 로직
    if ((startDate, endDate)) {
      let startDateIndex = 0;
      let endDateIndex = 0;

      data.forEach((el, index) => {
        if (el.day === startDate) startDateIndex = index;
        if (el.day === endDate) endDateIndex = index;
      });

      data.forEach((el, index) => {
        if (index >= startDateIndex && index <= endDateIndex) {
          dayArray.push(el.day);
          txLengthArray.push(el.txLength);
        }
      });
    } else {
      // 시작날짜와 끝 날짜가 없을 경우 모든 데이터 가공로직
      data.forEach((el) => {
        dayArray.push(el.day);
        txLengthArray.push(el.txLength);
      });
    }
  }

  // highchart 옵션부분
  const options = {
    chart: {
      zoomType: "x",
      type: "area",
      backgroundColor: "#1A1347",
      borderRadius: "10",
      height: 450,
    },
    colors: ["#5954FA"],
    style: {
      color: "#fff",
    },
    title: {
      text: "Number of Transactions by Date",
      style: {
        color: "#fff",
      },
      margin: 50,
      y: 25,
    },

    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: false,
    },
    yAxis: {
      title: {
        text: "Number of Transactions",
        style: {
          color: "#fff",
        },
      },
      min: 0,
      allowDecmal: false,
      labels: {
        style: {
          color: "#fff",
        },
      },
    },

    xAxis: {
      categories: dayArray,
      labels: {
        style: {
          color: "#fff",
        },
      },
    },

    legend: {
      enabled: false,
    },
    // time: {
    //   useUTC: false,
    // },

    tooltip: {
      style: {
        color: "#5954FA",
      },
    },

    series: [
      {
        name: "number of Transactions",
        data: txLengthArray,
        marker: {
          enabled: false,
        },
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default HighChart;
