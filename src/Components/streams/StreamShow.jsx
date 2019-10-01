import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Button } from 'semantic-ui-react';
import flv from 'flv.js';

import { fetchStream } from '../../actions';
import history from '../../history';

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
					<Card centered fluid style={{ maxWidth: '850px' }}>
						<Card.Content header={stream.title} textAlign='center' />
						<Card.Content>
							<video
								ref={this.videoRef}
								style={{ width: '100%' }}
								controls
							/>
						</Card.Content>
						<Card.Content extra textAlign='center'>
							<Icon name='user' />
							255 watching now | {` `}
							<Icon name='time' floated='right' />
							Started 5 minutes ago
							<Button
								onClick={() => history.push('/streams')}
								color='purple'
								size='mini'
								floated='right'
								icon='home'
								content='BACK'
							/>
						</Card.Content>
						<Card.Content
							description={stream.description}
							textAlign='center'
						/>
					</Card>
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
