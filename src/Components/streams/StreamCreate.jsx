import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { createStream } from '../../actions';
import StreamForm from './StreamForm';
import LoadingComponent from '../LoadComponent';

class StreamCreate extends Component {
	onSubmit = formValues => {
		this.props.createStream(formValues);
	};

	render() {
		// FOR THE LOADING
		if (!this.props.isSignedIn) return <LoadingComponent />;

		return (
			<Card centered fluid style={{ maxWidth: '700px' }}>
				<Card.Content header='CREATE A STREAM' textAlign='center' />
				<Card.Content>
					<StreamForm onSubmit={this.onSubmit} />
					<Button
						as={Link}
						to='/streams'
						floated='right'
						content='CANCEL'
						icon='cancel'
					/>
				</Card.Content>
			</Card>
		);
	}
}

const mapStateToProps = state => {
	return {
		isSignedIn: state.auth.isSignedIn
	};
};

export default connect(
	mapStateToProps,
	{ createStream }
)(StreamCreate);
