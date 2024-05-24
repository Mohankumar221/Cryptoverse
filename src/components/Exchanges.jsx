// Exchanges.jsx

import React from 'react';
import { Typography, Row, Col } from 'antd';
import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;

const Exchanges = () => {
  const { data, isLoading, isError } = useGetExchangesQuery();
 
  if (isLoading) return <Loader />;

  if (isError) return <Text>Error fetching exchanges</Text>;

  if (!data || !data.exchanges || data.exchanges.length === 0) {
    return <Text>No exchanges available</Text>;
  }

  return (
    <Row gutter={[32, 32]}>
      {data.exchanges.map((exchange) => (
        <Col key={exchange.slug} xs={24} sm={12} lg={6}>
          <a href={exchange.website} target="_blank" rel="noopener noreferrer">
            <div>{exchange.name}</div>
          </a>
        </Col>
      ))}
    </Row>
  );
};

export default Exchanges;
