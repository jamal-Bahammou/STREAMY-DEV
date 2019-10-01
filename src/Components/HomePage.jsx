import React from 'react';
import history from '../history';

const HomePage = () => {
	return (
		<div>
			<div>
				<div className='ui inverted vertical masthead center aligned segment'>
					<div className='ui text container'>
						<h1 className='ui inverted stackable header'>
							<img
								className='ui image massive'
								src='/logo.png'
								alt='logo'
							/>
							<div className='content'>STREAMY-DEV</div>
						</h1>
						<h2>
							YOU CAN START YOUR STREAMING NOW AND PUBLISH IT WITH
							STREAMY-DEV
						</h2>
						<div
							onClick={() => history.push('/streams')}
							className='ui huge white inverted button'
						>
							GET STARTED
							<i className='right arrow icon' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
