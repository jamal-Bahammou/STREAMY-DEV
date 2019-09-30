import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../history';

// HEADER
import Header from './Header';
import StreamList from './streams/StreamList';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamShow from './streams/StreamShow';

const App = () => {
	return (
		<div
			style={{
				marginTop: '10px',
				backgroundImage: "url('/background.jpg')"
			}}
		>
			<Router history={history}>
				<div className='ui container'>
					<Header />
					<Route path='/' exact component={StreamList} />
					<Route path='/streams/new' component={StreamCreate} />
					<Route path='/streams/edit/:id' component={StreamEdit} />
					<Route path='/streams/delete/:id' component={StreamDelete} />
					<Route path='/streams/show' component={StreamShow} />
				</div>
			</Router>
		</div>
	);
};

export default App;
