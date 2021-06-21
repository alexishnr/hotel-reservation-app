import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from './config/redux';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { routes } from './config/routes/';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Switch>
				{
				 Object.entries(routes).map(([path, route], i) =>
					 <Route key={`${path}_${i}`} component={route.component} path={path} exact />
				 )
				}
          </Switch>
		</Router>
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
