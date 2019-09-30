import React, { Component } from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';

import { fetchStream } from '../../actions';

class StreamShow extends Component {
	constructor(props) {
		super(props);

		this.videoRef = React.createRef();
	}

	componentDidMount() {
		const { fetchStream, match } = this.props;
		fetchStream(match.params.id);

		this.buildPlayer();
	}

	componentDidUpdate() {
		this.buildPlayer();
	}

	componentWillUnmount() {
		this.player.destroy();
	}

	buildPlayer() {
		const { match } = this.props;

		if (this.player || !this.props.stream) {
			return;
		}

		this.player = flv.createPlayer({
			type: 'flv',
			url: `http://localhost:8000/live/${match.params.id}.flv`
		});
		this.player.attachMediaElement(this.videoRef.current);
		this.player.load();
	}

	render() {
		const { stream } = this.props;
		return (
			<>
				{stream && (
					<div>
						<h2>{stream.title}</h2>
						<video
							ref={this.videoRef}
							style={{ width: '100%' }}
							controls
						/>
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
