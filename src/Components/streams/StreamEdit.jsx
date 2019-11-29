import React, { Component } from 'react';
import { Card, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import history from '../../history';

import LoadingComponent from '../LoadComponent';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class StreamEdit extends Component {
	state = {
		title: '',
		description: ''
	};

	onSubmit = e => {
		e.preventDefault();
		const editedStream = this.state;

		const { firestore } = this.props;

		firestore
			.update(
				{ collection: 'streams', doc: this.props.match.params.id },
				editedStream
			)
			.then(() => history.push('/streams'));
	};

	onChange = (e, data) => this.setState({ [data.name]: data.value });

	render() {
		const { stream } = this.props;

		// FOR THE LOADING
		if (!stream) return <LoadingComponent />;

		return (
			<Card centered fluid style={{ maxWidth: '700px' }}>
				<Card.Content header='EDIT STREAM' textAlign='center' />
				<Card.Content>
					<Card centered fluid>
						<Card.Content>
							<Form loading={!stream}>
								<Form.Input
									// error={{ content: 'Please enter your title', pointing: 'below' }}
									name='title'
									fluid
									label='ENTER TITLE'
									placeholder='Enter title'
									onChange={this.onChange}
									defaultValue={stream.title}
								/>
								<Form.Input
									// error='Please enter your description'
									name='description'
									fluid
									label='ENTER DESCRIPTION'
									placeholder='Enter description'
									onChange={this.onChange}
									defaultValue={stream.description}
								/>
								<Form.Checkbox
									label='I agree to the terms and conditions'
									// error={{
									// 	content: 'You must agree to the terms and conditions',
									// 	pointing: 'left',
									// }}
								/>
							</Form>
						</Card.Content>
					</Card>
					<Button
						onClick={this.onSubmit}
						as={Link}
						to='/streams'
						content='SUBMIT'
						color='blue'
						icon='save'
					/>
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
)(StreamEdit);
