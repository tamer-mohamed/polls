import React from 'react';
import Router from 'next/router';
import { Card, List } from 'antd';
import { parse } from 'url';
import pathMatch from 'path-match';
import PropTypes from 'prop-types';
import questionsService from '../services/questions';
import fecha from 'fecha';
import Question from '../types/question';
import Layout from '../components/layout';

const route = pathMatch();

/**
 * Display list of questions
 */
export default class QuestionsList extends React.Component {
  static async getInitialProps() {
    return { questions: await questionsService.list() };
  }

  static propTypes = {
    questions: PropTypes.arrayOf(Question).isRequired,
  };

  handleCardClick(url) {
    const match = route('/questions/:id');
    const query = match(url);

    Router.push(
      {
        pathname: '/questions',
        query,
      },
      url,
    );
  }

  render() {
    const { questions } = this.props;

    return (
      <Layout title="Questions">
        <h1>Questions</h1>
        <List
          grid={{ gutter: 16, md: 4 }}
          dataSource={questions}
          renderItem={({ url, published_at: publishedAt, choices, question }) =>
            <List.Item>
              <Card
                title={question}
                onClick={() => this.handleCardClick(url)}
                hoverable
              >
                <p>
                  {fecha.format(new Date(publishedAt), 'dddd MMMM Do, YYYY')}
                </p>
                <p>
                  Choices: {choices.length}
                </p>
              </Card>
            </List.Item>}
        />
      </Layout>
    );
  }
}
