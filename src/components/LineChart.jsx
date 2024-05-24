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
      const prices = coinHistory.data.history.map(item => parseFloat(item.price));
      const timestamps = coinHistory.data.history.map(item => new Date(item.timestamp * 1000).toLocaleDateString());
      // console.log('Parsed Prices:', prices);
      // console.log('Parsed Timestamps:', timestamps);
      setCoinPrice(prices);
      setCoinTimestamp(timestamps);
    }
  }, [coinHistory]);

  if (coinPrice.length === 0 || coinTimestamp.length === 0) {
    console.error("No data available for chart");
    return <div>No data available</div>;
  }

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
        min: Math.min(...coinPrice) - 10,
        max: Math.max(...coinPrice) + 10,
        ticks: {
          stepSize: 1
        }
      },
      x: {
        type: 'category'
      }
    }
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
