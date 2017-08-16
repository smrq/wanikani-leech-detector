import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './store/configureStore';
import { retrieveLocalData } from './localStorage';
import 'bulma';
import './index.scss';

const apiKey = retrieveLocalData('wanikani_leech_apikey');
const radicals = retrieveLocalData('wanikani_leech_radicals');
const kanji = retrieveLocalData('wanikani_leech_kanji');
const vocabulary = retrieveLocalData('wanikani_leech_vocabulary');

const store = configureStore({ apiKey, radicals, kanji, vocabulary });

ReactDOM.render((
	<Provider store={store}>
		<App />
	</Provider>
), document.getElementById('app'));
