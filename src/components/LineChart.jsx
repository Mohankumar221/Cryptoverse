import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const [coinPrice, setCoinPrice] = useState([]);
  const [coinTimestamp, setCoinTimestamp] = useState([]);

  useEffect(() => {
    if (coinHistory?.data?.history) {
      console.log("coinHistory.data.history exists and has length:", coinHistory.data.history.length);

      const prices = [];
      const timestamps = [];

      for (let i = 0; i < coinHistory.data.history.length; i += 1) {
        const price = parseFloat(coinHistory.data.history[i].price);
        const timestamp = new Date(coinHistory.data.history[i].timestamp * 1000).toLocaleDateString();

        prices.push(price);
        timestamps.push(timestamp);
      }

      setCoinPrice(prices);
      setCoinTimestamp(timestamps);

      console.log('coinPrice:', prices);
      console.log('coinTimestamp:', timestamps);
    } else {
      console.error("coinHistory or coinHistory.data.history is not defined or empty");
    }
  }, [coinHistory]);

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart</Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
