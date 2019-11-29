import React, { Component } from 'react';
import history from '../history';

import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';

class loginForm extends Component {
	state = {
		email: '',
		password: ''
	};

	onSubmit = e => {
		e.preventDefault();

		const { firebase } = this.props;
		const { email, password } = this.state;

		firebase
			.login({
				email,
				password
			})
			.then(() => history.push('/streams'))
			.catch(err => alert('Invalid Login Creadentials'));
	};

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	render() {
		return (
			<div class='ui page modals dimmer transition visible active'>
				<div
					class='ui mini modal transition visible active'
					style={{
						textAlign: 'center',
						top: '23%',
						left: '37%'
					}}
				>
					<div class='header'>Login to STREAMY-DEV</div>
					<div class='content'>
						<div class='description'>
							<form class='ui large form' onSubmit={this.onSubmit}>
								<div class='ui segment'>
									<div class='field'>
										<input
											name='email'
											placeholder='Email Address'
											type='text'
											required
											value={this.state.email}
											onChange={this.onChange}
										/>
									</div>
									<div class='field'>
										<input
											name='password'
											placeholder='password'
											type='password'
											value={this.state.password}
											onChange={this.onChange}
										/>
									</div>
									{/* begin */}
									<div class='ui four buttons'>
										<button
											type='submit'
											class='ui teal fluid button'
										>
											Login
										</button>
										<div class='or'></div>
										<button
											class='ui fluid button'
											onClick={() =>
												history.push('/streams/register')
											}
										>
											Register
										</button>
									</div>
									{/* end  */}
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
		);
	}
}

loginForm.propTypes = {
	firebase: PropTypes.object.isRequired
};

export default firebaseConnect()(loginForm);
