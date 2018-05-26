import React from 'react';
import { Row, Card, Col, List } from 'antd';
import Router from 'next/router';
import PropTypes from 'prop-types';
import axios from 'axios';
import fecha from 'fecha';
import getConfig from 'next/config';
import Question from '../types/question';
import Layout from '../components/layout';

const { publicRuntimeConfig: { SERVICE_URL } } = getConfig();

/**
 * Display list of questions
 */
const QuestionsList = ({ questions }) =>
  <Layout title="Polls">
    <Row type="flex" align="center" justify="center">
      <Col md={12}>
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
          dataSource={questions}
          renderItem={({ url, published_at: publishedAt, choices, question }) =>
            <List.Item>
              <Card title={question} onClick={Router.push(url)}>
                <p>
                  {fecha.format(new Date(publishedAt), 'dddd MMMM Do, YYYY')}
                </p>
                <p>
                  Length: {choices.length}
                </p>
              </Card>
            </List.Item>}
        />
      </Col>
    </Row>
  </Layout>;

QuestionsList.getInitialProps = async () => {
  let questions = [];

  try {
    const response = await axios.get(`${SERVICE_URL}/questions`);
    questions = response.data;
  } catch (e) {
    console.error('Error in fetching questions list', e.response);
  }

  return { questions };
};

QuestionsList.propTypes = {
  questions: PropTypes.arrayOf(Question).isRequired,
};

export default QuestionsList;
