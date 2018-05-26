import PropTypes from 'prop-types';

export default PropTypes.shape({
  votes: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  choice: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
});
