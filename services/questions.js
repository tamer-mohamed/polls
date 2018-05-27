import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig: { SERVICE_URL } } = getConfig();

export default {
  async list() {
    let questions = [];

    try {
      const response = await axios.get(`${SERVICE_URL}/questions`);
      questions = response.data;
    } catch (e) {
      console.error('Error in fetching questions list', e.response);
    }

    return questions;
  },
  async byId(id) {
    let question = {
      choices: [],
    };

    try {
      const response = await axios.get(`${SERVICE_URL}/questions/${id}`);
      question = response.data;
    } catch (e) {
      console.error('Error in fetching question details', e.response);
    }

    return question;
  },
};
