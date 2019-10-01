import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Loader } from 'semantic-ui-react';

import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId:
						'528959523182-u2djepku5tnibee5a5f0lac1sovfjs7q.apps.googleusercontent.com',
					scope: 'email'
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.onAuthChange(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	onAuthChange = isSignedIn => {
		isSignedIn
			? this.props.signIn(this.auth.currentUser.get().getId())
			: this.props.signOut();
	};

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return <Loader size='small' active inline='centered' />;
		} else if (this.props.isSignedIn) {
			return (
				<Button
					onClick={window.gapi.auth2.getAuthInstance().signOut}
					content='SIGN OUT'
					color='red'
					icon='sign-out'
				/>
			);
		} else {
			return (
				<button
					onClick={window.gapi.auth2.getAuthInstance().signIn}
					className='ui primary google button'
				>
					<i className='icon google' />
					SIGN IN
				</button>
			);
		}
	}

	render() {
		return <> {this.renderAuthButton()} </>;
	}
}

const mapStateToProps = state => {
	return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
	mapStateToProps,
	{ signIn, signOut }
)(GoogleAuth);
