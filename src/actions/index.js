import streams from '../api/streams';
import history from '../history';
import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_STREAM,
	FETCH_STREAMS,
	FETCH_STREAM,
	EDIT_STREAM,
	DELETE_STREAM
} from './types';

// SIGN IN TO THE APP
export const signIn = userId => {
	return {
		type: SIGN_IN,
		payload: userId
	};
};

// SIGN OUT FROM THE APP
export const signOut = () => {
	return {
		type: SIGN_OUT
	};
};

// CREATE A SINGLE STREAM
export const createStream = formValues => async (dispatch, getState) => {
	const { userId } = getState().auth;
	const response = await streams.post('/streams', { ...formValues, userId });
	dispatch({
		type: CREATE_STREAM,
		payload: response.data
	});
	// REDIRECT TO ROOT DIRECTORY
	history.push('/');
};

// GET ALL THE STREAMS FROM DATABASE
export const fetchStreams = () => async dispatch => {
	const response = await streams.get('/streams');
	dispatch({
		type: FETCH_STREAMS,
		payload: response.data
	});
};

// GET A SINGLE STREAM FROME DATABASE
export const fetchStream = id => async dispatch => {
	const response = await streams.get(`/streams/${id}`);
	dispatch({
		type: FETCH_STREAM,
		payload: response.data
	});
};

// UPDATE A STREAM IN DATABASE
export const editStream = (id, formValues) => async dispatch => {
	const response = await streams.patch(`/streams/${id}`, formValues);
	dispatch({
		type: EDIT_STREAM,
		payload: response.data
	});
	// REDIRECT TO ROOT DIRECTORY
	history.push('/');
};

// DELETE A STREAM FROM DATABASE
export const deleteStream = id => async dispatch => {
	await streams.delete(`/streams/${id}`);
	dispatch({
		type: DELETE_STREAM,
		payload: id
	});
	// REDIRECT TO ROOT DIRECTORY
	history.push('/');
};
