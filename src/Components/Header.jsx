import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import GoogleAuth from './GoogleAuth';

const Header = props => {
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
				<Menu.Item position='right'>
					{props.isSignedIn && (
						<Button
							as={Link}
							to='/'
							floated='right'
							positive
							inverted
							content='CREATE CHANNEL'
						/>
					)}
				</Menu.Item>
				<Menu.Item>
					<GoogleAuth />
				</Menu.Item>
			</Container>
		</Menu>
	);
};

const mapStateToProps = state => {
	return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps)(Header);
