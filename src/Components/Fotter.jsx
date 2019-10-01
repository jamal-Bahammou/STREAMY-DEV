import React from 'react';
import { Button } from 'semantic-ui-react';

const Fotter = () => {
	return (
		<div style={{ textAlign: 'center', marginTop: '20px' }}>
			<a
				href='https://www.instagram.com/jamal_bahammou/'
				target='_blank'
				rel='noopener noreferrer'
			>
				<Button circular color='instagram' icon='instagram' />
			</a>
			<a
				href='https://www.facebook.com/jamal.bahammou'
				target='_blank'
				rel='noopener noreferrer'
			>
				<Button circular color='facebook' icon='facebook' />
			</a>
			<a
				href='https://twitter.com/jamal_bahammou'
				target='_blank'
				rel='noopener noreferrer'
			>
				<Button circular color='twitter' icon='twitter' />
			</a>
			<Button circular color='linkedin' icon='linkedin' />
			<Button circular color='google plus' icon='google plus' />
		</div>
	);
};

export default Fotter;
