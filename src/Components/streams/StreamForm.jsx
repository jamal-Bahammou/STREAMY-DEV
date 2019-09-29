import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className='field error'>
					<div className='ui pointing above prompt label'>{error}</div>
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
					{this.renderError(meta)}
				</div>
			</>
		);
	};

	onSubmit = formValues => {
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<div className='ui segment'>
				<div className='ui form'>
					<form
						onSubmit={this.props.handleSubmit(this.onSubmit)}
						className='ui form error'
					>
						<Field
							name='title'
							component={this.renderInput}
							label='ENTER TITLE'
							placeholder='Enter Stream Title'
						/>
						<Field
							name='description'
							component={this.renderInput}
							label='ENTER DESCRIPTION'
							placeholder='Enter Stream Description'
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
		errors.title = 'Please enter title of stream';
	}

	if (!formValues.description) {
		errors.description = 'Please enter description of stream';
	}

	return errors;
};

export default reduxForm({
	form: 'streamForm',
	validate
})(StreamForm);
