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
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

const panes = [
	{ menuItem: 'ALL STREAMS', pane: { key: 'allStreams' } },
	{ menuItem: 'PAST STREAMS', pane: { key: 'pastStreams' } },
	{ menuItem: 'FUTURE STREAMS', pane: { key: 'futureStreams' } },
	{ menuItem: 'HOSTING', pane: { key: 'hosted' } }
];

class StreamList extends Component {
	componentDidMount() {
		this.props.fetchStreams();
	}
	render() {
		const { streams, isSignedIn } = this.props;
		return (
			<Grid.Column width={12}>
				<Segment attached>
					{isSignedIn && (
						<Button
							as={Link}
							to={'/streams/new'}
							content='CREATE STREAM'
							icon='plus circle'
							color='purple'
							floated='right'
							style={{ marginTop: '10px' }}
						/>
					)}
					<Header
						icon='twitch'
						content='STREAMS'
						style={{ marginTop: '10px' }}
					/>
					<Tab panes={panes} menu={{ secondary: true, pointing: true }} />
					<br />

					<Card.Group itemsPerRow={4}>
						{streams.map(stream => (
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
								{stream.userId === this.props.currentUserId && (
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
								)}
							</Card>
						))}
					</Card.Group>
				</Segment>
			</Grid.Column>
		);
	}
}

const mapStateToProps = state => {
	return {
		streams: Object.values(state.streams),
		currentUserId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn
	};
};

export default connect(
	mapStateToProps,
	{ fetchStreams }
)(StreamList);
