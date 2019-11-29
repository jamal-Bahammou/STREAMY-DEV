import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
// REDUCERS
// @TODO

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyBdoAOqZFewzohGsc-mH4_VC8U-fntyB8A',
	authDomain: 'streamy-dev-a9788.firebaseapp.com',
	databaseURL: 'https://streamy-dev-a9788.firebaseio.com',
	projectId: 'streamy-dev-a9788',
	storageBucket: 'streamy-dev-a9788.appspot.com',
	messagingSenderId: '892865446944',
	appId: '1:892865446944:web:36b3b6073dd3dd79e12845',
	measurementId: 'G-G5VEJSB2GS'
};

// react-redux-firebase config
const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
// const firestore = firebase.firestore();
// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
	reactReduxFirebase(firebase, rrfConfig),
	reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer
});

// Create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(
	rootReducer,
	initialState,
	compose(
		reactReduxFirebase(firebase)
		// window.__REDUX_DEVTOOLS_EXTENSION__ && Enable this if you want to use REDUX_DEVTOOLS_EXTENSION
		// 	window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
