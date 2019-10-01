import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends Component {
	onSubmit = formValues => {
		this.props.createStream(formValues);
	};

	render() {
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

export default connect(
	null,
	{ createStream }
)(StreamCreate);
