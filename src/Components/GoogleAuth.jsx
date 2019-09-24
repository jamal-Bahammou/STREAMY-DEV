import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId:
						'528959523182-2qcgtm6d5v19u5tshq3sk7tr23d8ng0t.apps.googleusercontent.com',
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
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<button onClick={this.auth.signOut} className='ui red button'>
					SIGN OUT
				</button>
			);
		} else {
			return (
				<button
					onClick={this.auth.signIn}
					className='ui primary google button'
				>
					<i className='icon google' />
					SIGN IN
				</button>
			);
		}
	}

	render() {
		return <div className='item'> {this.renderAuthButton()} </div>;
	}
}

const mapStateToProps = state => {
	return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(
	mapStateToProps,
	{ signIn, signOut }
)(GoogleAuth);
