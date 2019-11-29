import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';

import history from '../history';

class registerForm extends Component {
	state = {
		knownAs: '',
		email: '',
		password: ''
	};

	onSubmit = e => {
		e.preventDefault();

		const { firebase } = this.props;
		const { email, password } = this.state;

		firebase
			.createUser({ email, password })
			.then(() => history.push('/streams'))
			.catch(err => alert(err));
	};

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	render() {
		const { knownAs, email, password } = this.state;
		return (
			<div class='ui page modals dimmer transition visible active'>
				<div
					class='ui mini modal transition visible active'
					style={{
						textAlign: 'center',
						top: '20%',
						left: '37%'
					}}
				>
					<div class='header'>Sign Up to STREAMY-DEV!</div>
					<div class='content'>
						<div class='description'>
							<div>
								<form class='ui large form' onSubmit={this.onSubmit}>
									<div class='ui segment'>
										<div class='field'>
											<input
												onChange={this.onChange}
												name='knownAs'
												placeholder='Known As'
												type='text'
												value={knownAs}
											/>
										</div>
										<div class='field'>
											<input
												onChange={this.onChange}
												name='email'
												placeholder='Email'
												type='text'
												value={email}
											/>
										</div>
										<div class='field'>
											<input
												onChange={this.onChange}
												name='password'
												placeholder='Password'
												type='password'
												value={password}
											/>
										</div>
										<div class='ui four buttons'>
											<button
												class='ui teal fluid button'
												type='submit'
											>
												Register
											</button>
											<div class='or'></div>
											<button
												class='ui fluid button'
												onClick={() =>
													history.push('/streams/login')
												}
											>
												Login
											</button>
										</div>
										<div class='ui horizontal divider'>Or</div>
										<div>
											<button
												type='button'
												class='ui facebook fluid button'
												style={{ marginBottom: '10px' }}
											>
												<i
													aria-hidden='true'
													class='facebook icon'
												></i>{' '}
												Login with Facebook
											</button>
											<button
												type='button'
												class='ui google plus fluid button'
											>
												<i
													aria-hidden='true'
													class='google plus icon'
												></i>
												Login with Google
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

registerForm.propTypes = {
	firebase: PropTypes.object.isRequired
};

export default firebaseConnect()(registerForm);
