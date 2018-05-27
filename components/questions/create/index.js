import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Icon,
  Button,
  Tooltip,
  Divider,
  notification,
} from 'antd';
import Router from 'next/router';
import Link from 'next/link';
import questionsService from '../../../services/questions';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

// Identfier for choices
const KEYS_INITIAL_VALUES = [0, 1];
const MIN_CHOICES = KEYS_INITIAL_VALUES.length;
let uuid = MIN_CHOICES;

/**
 * Create question form
 */
export class CreateQuestion extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      getFieldValue: PropTypes.func.isRequired,
      validateFields: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {};

  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');

    if (keys.length === MIN_CHOICES) {
      return;
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');

    form.setFieldsValue({
      keys: [...keys, uuid],
    });

    uuid += 1;
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.setState({ loading: true });
      if (!err) {
        questionsService
          .create({
            question: values.question,
            choices: values.choices.filter(k => !!k),
          })
          .then(({ data }) => {
            // component shall be unmounted
            Router.push('/').then(() => {
              notification.success({
                message: `Question: ${data.question} is created`,
              });
            });
          })
          .catch(() => {
            this.setState({ loading: false });
            notification.error({
              message: 'Error on submitting you question.',
            });
          });
      }
    });
  };

  renderChoices() {
    const { getFieldValue, getFieldDecorator } = this.props.form;
    getFieldDecorator('keys', { initialValue: KEYS_INITIAL_VALUES });
    const keys = getFieldValue('keys');

    return keys.map((k, index) =>
      <FormItem
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'Choices' : ''}
        required={
          index === 0 /* display required flag on the first label only */
        }
        key={k}
      >
        {getFieldDecorator(`choices[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: 'Please input a choice or delete this field.',
            },
          ],
        })(<Input placeholder="Please enter a choice" />)}
        {keys.length > MIN_CHOICES &&
          <Button onClick={() => this.remove(k)}>
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === MIN_CHOICES}
            />{' '}
            Remove
          </Button>}
      </FormItem>,
    );
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>
          <Link href="/">
            <a>
              <Tooltip title="Back">
                <Icon type="left" />
              </Tooltip>
            </a>
          </Link>
          <Divider type="vertical" />Create a new question
        </h1>
        <FormItem label="Title" {...formItemLayout}>
          {getFieldDecorator('question', {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Please input a title for the question.',
              },
            ],
          })(<Input placeholder="Question title" />)}
        </FormItem>
        {this.renderChoices()}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
            <Icon type="plus" /> Add field
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel} className="adjust-right">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
            size="large"
          >
            Submit
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create({})(CreateQuestion);
