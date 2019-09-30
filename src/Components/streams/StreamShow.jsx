import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchStream } from '../../actions';

class StreamShow extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}
	render() {
		const { stream } = this.props;
		return (
			<>
				{stream && (
					<div>
						<h2>{stream.title}</h2>
						<h5>{stream.description}</h5>
					</div>
				)}
			</>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id]
	};
};

export default connect(
	mapStateToProps,
	{ fetchStream }
)(StreamShow);
