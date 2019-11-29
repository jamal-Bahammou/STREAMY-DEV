import React, { Component } from 'react';
import {
	Grid,
	Segment,
	Header,
	Card,
	Image,
	Tab,
	Button
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Fotter from '../Fotter';

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

const panes = [
	{ menuItem: 'ALL STREAMS', pane: { key: 'allStreams' } },
	{ menuItem: 'PAST STREAMS', pane: { key: 'pastStreams' } },
	{ menuItem: 'FUTURE STREAMS', pane: { key: 'futureStreams' } },
	{ menuItem: 'HOSTING', pane: { key: 'hosted' } }
];

class StreamList extends Component {
	render() {
		const { streams } = this.props;
		const { auth } = this.props;
		return (
			<Grid.Column width={12}>
				<Segment attached loading={!streams}>
					<Button
						as={Link}
						to={'/streams/new'}
						content='CREATE STREAM'
						icon='plus circle'
						color='purple'
						floated='right'
						style={{ marginTop: '10px' }}
					/>
					<Header
						icon='twitch'
						content='STREAMS'
						style={{ marginTop: '10px' }}
					/>
					<Tab panes={panes} menu={{ secondary: true, pointing: true }} />
					<br />

					<Card.Group itemsPerRow={4}>
						{!streams
							? console.log('Loading...')
							: streams.map(stream => (
									<Card
										key={stream.id}
										as={Link}
										to={`/streams/${stream.id}`}
									>
										<Image src={'/live_stream.png'} />
										<Card.Content>
											<Card.Header textAlign='center'>
												{stream.title}
											</Card.Header>
										</Card.Content>
										{stream.userId === auth.uid && (
											<Card.Content extra>
												<div className='ui two buttons'>
													<Button
														as={Link}
														to={`/streams/edit/${stream.id}`}
														basic
														icon='edit'
														color='green'
													/>
													<Button
														as={Link}
														to={`/streams/delete/${stream.id}`}
														basic
														icon='trash'
														color='red'
													/>
												</div>
											</Card.Content>
										)}
									</Card>
							  ))}
					</Card.Group>
				</Segment>
				<Fotter />
			</Grid.Column>
		);
	}
}

StreamList.propTypes = {
	firestore: PropTypes.object.isRequired,
	streams: PropTypes.array,
	auth: PropTypes.object.isRequired
};

export default compose(
	firestoreConnect([{ collection: 'streams' }]),
	connect((state, props) => ({
		streams: state.firestore.ordered.streams,
		auth: state.firebase.auth
	}))
)(StreamList);
