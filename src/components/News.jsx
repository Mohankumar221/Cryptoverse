import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('coindesk');

  // Define an array of news sources
  const newsSources = [
    'CoinDesk',
    'Cointelegraph',
    'Bitcoinist',
    'Decrypt',
    'BSC News',
    'The Guardian'
  ];

  // Fetch crypto news based on the selected news category
  const { data: cryptoNews, isFetching, error } = useGetCryptoNewsQuery({ source: newsCategory }); // Pass newsCategory directly
  const maxNewsItems = simplified ? 6 : 25;

  // Slice the cryptoNews.data array to include only the desired number of items
  const limitedCryptoNews = cryptoNews.data.slice(0, maxNewsItems);

  if (isFetching) return 'Loading...';
  if (error) return 'Error fetching news';
  if (!cryptoNews?.data) return 'No news available';

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a News Source"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          >
            {newsSources.map((source, index) => (
              <Option key={index} value={source}>{source}</Option>
            ))}
          </Select>
        </Col>
      )}
      {limitedCryptoNews.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.title}</Title>
                <img
                  src={news.thumbnail || demoImage}
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                  alt="news"
                />
              </div>
              <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={demoImage} alt="provider" />
                  <Text className="provider-name">{news.provider || 'Unknown Provider'}</Text>
                </div>
                <Text>{moment(news.createdAt).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
