import React from 'react';
import { Row, Card, Col, List } from 'antd';
import { parse } from 'url';
import pathMatch from 'path-match';
import Router from 'next/router';
import PropTypes from 'prop-types';
import axios from 'axios';
import fecha from 'fecha';
import getConfig from 'next/config';
import Question from '../types/question';
import Layout from '../components/layout';

const { publicRuntimeConfig: { SERVICE_URL } } = getConfig();
const route = pathMatch();

/**
 * Display list of questions
 */
export default class QuestionsList extends React.Component {
  static async getInitialProps() {
    let questions = [];

    try {
      const response = await axios.get(`${SERVICE_URL}/questions`);
      questions = response.data;
    } catch (e) {
      console.error('Error in fetching questions list', e.response);
    }

    return { questions };
  }

  static propTypes = {
    questions: PropTypes.arrayOf(Question).isRequired,
  };

  handleCardClick(url) {
    const match = route('/questions/:id');
    const params = match(url);

    Router.push(
      {
        pathname: '/questions',
        query: params,
      },
      url,
    );
  }

  render() {
    const { questions } = this.props;

    return (
      <Layout title="Polls">
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
          dataSource={questions}
          renderItem={({ url, published_at: publishedAt, choices, question }) =>
            <List.Item>
              <Card title={question} onClick={() => this.handleCardClick(url)}>
                <p>
                  {fecha.format(new Date(publishedAt), 'dddd MMMM Do, YYYY')}
                </p>
                <p>
                  Length: {choices.length}
                </p>
              </Card>
            </List.Item>}
        />
      </Layout>
    );
  }
}
