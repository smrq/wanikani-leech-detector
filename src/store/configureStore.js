import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialData) {
	const middleware = applyMiddleware(thunk);
	return createStore(rootReducer, initialData, middleware);
}
