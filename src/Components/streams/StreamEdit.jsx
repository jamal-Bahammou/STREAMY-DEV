import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	onSubmit = formValues => {
		this.props.editStream(this.props.match.params.id, formValues);
	};

	render() {
		const { stream } = this.props;

		if (!stream) {
			return <div>Loading !!!</div>;
		}

		return (
			<Card centered fluid style={{ maxWidth: '700px' }}>
				<Card.Content header='CREATE A STREAM' textAlign='center' />
				<Card.Content>
					<StreamForm
						initialValues={_.pick(
							this.props.stream,
							'title',
							'description'
						)}
						onSubmit={this.onSubmit}
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

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
	mapStateToProps,
	{ fetchStream, editStream }
)(StreamEdit);
