import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className='field error'>
					<label>{error}</label>
				</div>
			);
		}
	}

	renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<>
				<div className={className}>
					<label>{label}</label>
					<input {...input} />
				</div>
				{this.renderError(meta)}
			</>
		);
	};

	onSubmit(formValues) {
		console.log(formValues);
	}

	render() {
		return (
			<div className='ui inverted segment' style={{ marginTop: '40px' }}>
				<div className='ui inverted form'>
					<form
						onSubmit={this.props.handleSubmit(this.onSubmit)}
						className='ui form error'
					>
						<Field
							name='title'
							component={this.renderInput}
							label='ENTER TITLE'
						/>
						<Field
							name='description'
							component={this.renderInput}
							label='ENTER DESCRIPTION'
						/>
						<button className='ui button primary'>SUBMIT</button>
					</form>
				</div>
			</div>
		);
	}
}

const validate = formValues => {
	const errors = {};

	if (!formValues.title) {
		errors.title = 'You must enter a title';
	}

	if (!formValues.description) {
		errors.description = 'You must enter a description';
	}

	return errors;
};

export default reduxForm({
	form: 'streamCreate',
	validate
})(StreamCreate);
