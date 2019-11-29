import React, { Component } from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';
import flv from 'flv.js';
import LoadingComponent from '../LoadComponent';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class StreamShow extends Component {
	constructor(props) {
		super(props);

		this.videoRef = React.createRef();
	}

	componentDidMount() {
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
		const { stream, history } = this.props;
		if (!stream) return <LoadingComponent />;
		return (
			<>
				<Card centered fluid style={{ maxWidth: '850px' }}>
					<Card.Content header={stream.title} textAlign='center' />
					<Card.Content>
						<video
							ref={this.videoRef}
							style={{ width: '100%' }}
							poster='/live_stream.png'
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
			</>
		);
	}
}

export default compose(
	firestoreConnect(props => [
		{
			collection: 'streams',
			storeAs: 'stream',
			doc: props.match.params.id
		}
	]),
	connect(({ firestore: { ordered } }, props) => ({
		stream: ordered.stream && ordered.stream[0]
	}))
)(StreamShow);
