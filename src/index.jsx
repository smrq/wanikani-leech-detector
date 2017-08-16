import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma';
import './index.scss';

import App from './components/App';
import { retrieveLocalData } from './localStorage';

const apiKey = retrieveLocalData('wanikani_leech_apikey');
const kanji = retrieveLocalData('wanikani_leech_kanji');
const vocabulary = retrieveLocalData('wanikani_leech_vocabulary');

ReactDOM.render(
	<App apiKey={apiKey} kanji={kanji} vocabulary={vocabulary} />,
	document.getElementById('app'));
