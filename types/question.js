import PropTypes from 'prop-types';
import Choice from './choice';

export default PropTypes.shape({
  url: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(Choice),
});
