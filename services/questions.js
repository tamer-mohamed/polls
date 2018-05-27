import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig: { SERVICE_URL } } = getConfig();

export default {
  list() {
    return axios.get(`${SERVICE_URL}/questions`).then(({ data }) => data);
  },
  byId(id) {
    return axios.get(`${SERVICE_URL}/questions/${id}`).then(({ data }) => data);
  },
  vote({ questionId, choiceId }) {
    return axios.post(
      `${SERVICE_URL}/questions/${questionId}/choices/${choiceId}`,
    );
  },
};
