import React, { Component } from 'react';
import { Card, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class StreamCreate extends Component {
	state = {
		title: '',
		description: '',
		userId: this.props.auth.uid
	};

	onSubmit = e => {
		e.preventDefault();
		const newStream = this.state;

		const { firestore, history } = this.props;
		firestore
			.add({ collection: 'streams' }, newStream)
			.then(() => history.push('/streams'));
	};

	onChange = (e, data) => this.setState({ [data.name]: data.value });
	render() {
		return (
			<Card centered fluid style={{ maxWidth: '700px' }}>
				<Card.Content header='CREATE A STREAM' textAlign='center' />
				<Card.Content>
					<Card centered fluid>
						<Card.Content>
							<Form>
								<Form.Input
									// error={{ content: 'Please enter your title', pointing: 'below' }}
									name='title'
									fluid
									label='ENTER TITLE'
									placeholder='Enter title'
									onChange={this.onChange}
								/>
								<Form.Input
									// error='Please enter your description'
									name='description'
									fluid
									label='ENTER DESCRIPTION'
									placeholder='Enter description'
									onChange={this.onChange}
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

StreamCreate.propTypes = {
	firestore: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

export default compose(
	firestoreConnect(),
	connect((state, props) => ({
		auth: state.firebase.auth
	}))
)(StreamCreate);
