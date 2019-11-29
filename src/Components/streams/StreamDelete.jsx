import React, { Component } from 'react';
import Modals from './Modals';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class StreamDelete extends Component {
	// ON DELETE FUNCTION
	onSubmit = e => {
		e.preventDefault();
		const editedStream = this.state;

		const { firestore, history } = this.props;

		firestore
			.delete(
				{ collection: 'streams', doc: this.props.match.params.id },
				editedStream
			)
			.then(() => history.push('/streams'));
	};

	// THE BUTTON OF DELETE POPUP
	renderActions() {
		return (
			<Button.Group widths={4}>
				<Button onClick={this.onSubmit} fluid color='red'>
					Delete
				</Button>
				<Button.Or />
				<Button as={Link} to='/streams' fluid>
					Cancel
				</Button>
			</Button.Group>
		);
	}

	renderContent() {
		if (!this.props.stream) {
			return 'Are you sure you want to delete this stream?';
		}

		return `Are you sure you want to delete the stream with title:  ${this.props.stream.title}`;
	}

	render() {
		return (
			<Modals
				title='DELETE STREAM'
				content={this.renderContent()}
				action={this.renderActions()}
				onDismiss={() => this.props.history.push('/streams')}
			/>
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
)(StreamDelete);
