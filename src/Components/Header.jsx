import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<div className='ui inverted menu'>
			<Link to='/' className='item'>
				<img src='/logo.png' alt='logo' />
			</Link>
			<div className='right menu'>
				<Link to='/' className='active item'>
					HOME
				</Link>
				<Link to='/' className='item'>
					STREAMS
				</Link>
				<Link to='/streams/new' className='item'>
					CREATE STREAM
				</Link>
				<div className='item'>
					<div className='ui primary button'>SIGN UP</div>
				</div>
				<div className='item'>
					<div className='ui button'>LOG-IN</div>
				</div>
				<div className='item'>
					<div className='ui red button'>LOG-OUT</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
