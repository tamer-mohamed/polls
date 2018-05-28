import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { Card, List, Icon, Divider, Tooltip } from 'antd';
import pathMatch from 'path-match';
import PropTypes from 'prop-types';
import fecha from 'fecha';
import questionsService from '../services/questions';
import Question from '../types/question';
import Layout from '../components/layout';

const route = pathMatch();

/**
 * Display list of questions
 */
export default class QuestionsList extends React.Component {
  static async getInitialProps() {
    let questions = [];

    try {
      questions = await questionsService.list();
    } catch (e) {
      console.error('Error in fetching questions list', e.response);
    }

    return { questions };
  }

  static propTypes = {
    questions: PropTypes.arrayOf(Question).isRequired,
  };

  static handleCardClick(url) {
    const match = route('/questions/:id');
    const query = match(url);

    Router.push(
      {
        pathname: '/detail',
        query,
      },
      url,
    );
  }

  renderItem({ url, published_at: publishedAt, choices, question }) {
    return (
      <List.Item className="fit">
        <Card
          title={question}
          onClick={() => QuestionsList.handleCardClick(url)}
          hoverable
        >
          <p>
            {fecha.format(new Date(publishedAt), 'dddd MMMM Do, YYYY')}
          </p>
          <p>
            Choices: {choices.length}
          </p>
        </Card>
      </List.Item>
    );
  }

  render() {
    const { questions } = this.props;

    return (
      <Layout title="Questions">
        <h1>
          <Link href="/create" as="/create">
            <a>
              <Tooltip title="Create a new question">
                <Icon type="plus-circle" />
              </Tooltip>
            </a>
          </Link>
          <Divider type="vertical" />Questions
        </h1>
        <List
          grid={{ gutter: 16, md: 4 }}
          dataSource={questions}
          renderItem={this.renderItem}
        />
      </Layout>
    );
  }
}
