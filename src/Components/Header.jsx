import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Container, Label, Image } from 'semantic-ui-react';

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import history from '../history';

class Header extends Component {
	// LOG OUT FUNCTION
	onLogoutClick = e => {
		e.preventDefault();

		const { firebase } = this.props;
		firebase.logout().then(() => history.push('/streams/login'));
	};

	render() {
		const { auth } = this.props;
		return (
			<Menu inverted fixed='top'>
				<Container>
					<Menu.Item as={Link} to='/' header>
						<img src='/logo.png' alt='logo' />
						STREAMY-DEV
					</Menu.Item>
					<Menu.Item as={Link} to='/streams' name='HOME' />
					<Menu.Item as={Link} to='/streams' name='STREAMS' />
					<Menu.Item as={Link} to='/' name='ABOUT' />
					<Menu.Item position='right' style={{ paddingRight: '0px' }}>
						{auth.uid && (
							<>
								<Label as='a' color='teal' onClick={this.onLogoutClick}>
									<Image avatar spaced='right' src='/admin.jpg' />
									{auth.email}
								</Label>
							</>
						)}
					</Menu.Item>
				</Container>
			</Menu>
		);
	}
}

Header.propTypes = {
	firebase: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

export default compose(
	firestoreConnect(),
	connect((state, props) => ({
		auth: state.firebase.auth
	}))
)(Header);
