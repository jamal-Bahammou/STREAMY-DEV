import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'semantic-ui-react';

const Modals = props => {
	return ReactDOM.createPortal(
		<Modal
			closeOnDimmerClick
			onClose={props.onDismiss}
			size='tiny'
			open={true}
			style={{ textAlign: 'center' }}
		>
			<Modal.Header>{props.title}</Modal.Header>
			<Modal.Content>
				<Modal.Description>
					<h4>{props.content}</h4>
					{props.action}
				</Modal.Description>
			</Modal.Content>
		</Modal>,
		document.querySelector('#modal')
	);
};

export default Modals;
