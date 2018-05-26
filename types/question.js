import PropTypes from 'prop-types';
import Choice from './choice';

export default PropTypes.shape({
  url: PropTypes.string.isRequired,
  published_at: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(Choice),
  question: PropTypes.string.isRequired,
});
