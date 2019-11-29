import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import HomePage from './HomePage';
import Header from './Header';
import StreamList from './streams/StreamList';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamShow from './streams/StreamShow';
import loginForm from './loginForm';
import registerForm from './registerForm';

import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';

const App = () => {
	return (
		<div>
			<Router history={history}>
				<Switch>
					<Route exact path='/' component={HomePage} />
				</Switch>

				<Route
					path='/(.+)'
					render={() => (
						<div
							className='ui container'
							style={{ margin: '68px 0 20px 0' }}
						>
							<Header />
							<Switch>
								<Route
									path='/streams'
									exact
									component={UserIsAuthenticated(StreamList)}
								/>
								<Route
									path='/streams/login'
									component={UserIsNotAuthenticated(loginForm)}
								/>
								<Route
									path='/streams/register'
									component={UserIsNotAuthenticated(registerForm)}
								/>
								<Route
									path='/streams/new'
									component={UserIsAuthenticated(StreamCreate)}
								/>
								<Route
									path='/streams/edit/:id'
									component={UserIsAuthenticated(StreamEdit)}
								/>
								<Route
									path='/streams/delete/:id'
									component={UserIsAuthenticated(StreamDelete)}
								/>
								<Route
									path='/streams/:id'
									component={UserIsAuthenticated(StreamShow)}
								/>
							</Switch>
						</div>
					)}
				/>
			</Router>
		</div>
	);
};

export default App;
