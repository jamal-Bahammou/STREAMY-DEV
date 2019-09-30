import React from 'react';
import { Link } from 'react-router-dom';

import GoogleAuth from './GoogleAuth';

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
				{/* CALL THE GOOGLE AUTH FILE */}
				<GoogleAuth />
			</div>
		</div>
	);
};

export default Header;
