import React, { Component } from 'react';
import Modals from '../Modals';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import history from '../../history';
import { connect } from 'react-redux';

import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	// THE BUTTON OF DELETE POPUP
	renderActions() {
		const { deleteStream, match } = this.props;
		return (
			<Button.Group widths={4}>
				<Button
					onClick={() => deleteStream(match.params.id)}
					fluid
					color='red'
				>
					Delete
				</Button>
				<Button.Or />
				<Button as={Link} to='/streams' fluid positive>
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
				onDismiss={() => history.push('/streams')}
			/>
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
	{ fetchStream, deleteStream }
)(StreamDelete);
