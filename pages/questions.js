import React from 'react';
import Router from 'next/router';
import { Table, Progress, Icon, Divider, Button, notification } from 'antd';
import Link from 'next/link';
import pathMatch from 'path-match';
import questionsService from '../services/questions';
import Question from '../types/question';
import Layout from '../components/layout';

const route = pathMatch();

/**
 * Display question details (choices and votes)
 */
export default class QuestionsDetail extends React.Component {
  static async getInitialProps({ query }) {
    let question = {
      choices: [],
    };

    try {
      const question = await questionsService.byId(query.id);
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
      title: 'Choice',
      dataIndex: 'choice',
      render(text) {
        return text;
      },
    },
    {
      title: 'Votes',
      dataIndex: 'votes',
      render(text) {
        return text;
      },
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      render: (text, record) => {
        const percentage = record.votes / this.state.total * 100;

        return (
          <Progress
            percent={
              Number.isNaN(percentage) ? 0 : parseFloat(percentage.toFixed(1))
            }
            successPercent={-1}
          />
        );
      },
    },
  ];

  handleChoiceSelection = ({ url: selectedChoice }) => {
    this.setState({ selectedChoice });
  };

  handleSubmitVote = () => {
    const { selectedChoice } = this.state;
    const match = route('/questions/:questionId/choices/:choiceId');
    const params = match(selectedChoice);

      
    questionsService
      .vote(params)
      .then(() => {
        Router.push('/').then(() => {
          notification.success({
            message: 'Your vote successfully submitted',
          });
        });
      })
      .catch(e => {
        console.error(e);

        notification.error({
          message: 'Something went wrong...',
        });
      });
  };

  render() {
    const { question } = this.props;
    const { selectedChoice } = this.state;

    return (
      <Layout title={question.question}>
        <h1>
          <Link href="/">
            <a>
              <Icon type="left" /> Back
            </a>
          </Link>
          <Divider type="vertical" /> Question: {question.question}
        </h1>
        <Table
          dataSource={question.choices}
          rowClassName={({ choice }) =>
            choice != selectedChoice ? 'pointer' : ''}
          onRow={record => ({
            onClick: () => this.handleChoiceSelection(record),
          })}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [selectedChoice],
            onSelect: this.handleChoiceSelection,
          }}
          rowKey="url"
          columns={this.columns}
          pagination={false}
          size="small"
        />

        <div className="adjust-right large-spacing">
          <Button
            onClick={this.handleSubmitVote}
            disabled={!selectedChoice}
            type="primary"
            size="large"
          >
            Save vote
          </Button>
        </div>
      </Layout>
    );
  }
}
