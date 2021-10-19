import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NoResults extends Component {
	render() {
		const { content } = this.props;
		return (
			<div className="No-results">{content}</div>
		);
	}
}

NoResults.propTypes = {
	content: PropTypes.string.isRequired
};

export default NoResults;
