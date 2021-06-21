import { applyMiddleware, createStore, compose } from 'redux';
import rootReducers from '../../services/redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const middlewares = [];

const AccordingWithCompose = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose;

export default createStore(rootReducers, AccordingWithCompose(applyMiddleware(...middlewares)));
