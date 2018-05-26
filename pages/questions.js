import React from 'react';
import axios from 'axios';
import { Table } from 'antd';
import getConfig from 'next/config';
import Question from '../types/question';
import Layout from '../components/layout';

const { publicRuntimeConfig: { SERVICE_URL } } = getConfig();

/**
 * Display question details (choices and votes)
 */
export default class QuestionsList extends React.Component {
  static async getInitialProps({ query }) {
    let question = {
      choices: [],
    };

    console.log('query', query);

    try {
      const response = await axios.get(`${SERVICE_URL}/questions/${query.id}`);
      question = response.data;
    } catch (e) {
      console.error('Error in fetching question details', e.response);
    }

    return { question };
  }

  static propTypes = {
    question: Question,
  };

  state = {
    total: this.props.question.choices.reduce(
      (sum, { votes }) => sum + votes,
      0,
    ),
  };

  columns = [
    {
      dataIndex: 'choice',
      render(text) {
        return text;
      },
    },
    {
      dataIndex: 'votes',
      render(text) {
        return text;
      },
    },
    {
      dataIndex: 'percentage',
      render: (text, record) => {
        const percentage = record.votes / this.state.total * 100;

        return Number.isNaN(percentage) ? 0 : percentage;
      },
    },
  ];

  render() {
    const { question } = this.props;

    return (
      <Layout title={question.question}>
        <Table
          dataSource={question.choices}
          rowKey="choice"
          columns={this.columns}
          pagination={false}
          size="small"
        />
      </Layout>
    );
  }
}
