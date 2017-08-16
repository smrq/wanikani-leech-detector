import { combineReducers } from 'redux';

function apiKey(state = null, action) {
	switch (action.type) {
		case 'SET_API_KEY':
			return action.payload;
		case 'SIGN_OUT':
			return null;
		default:
			return state;
	}
}

function radicals(state = null, action) {
	switch (action.type) {
		case 'RADICALS_LOADED':
			return action.payload;
		case 'REFRESH':
		case 'SIGN_OUT':
			return null;
		default:
			return state;
	}
}

function kanji(state = null, action) {
	switch (action.type) {
		case 'KANJI_LOADED':
			return action.payload;
		case 'REFRESH':
		case 'SIGN_OUT':
			return null;
		default:
			return state;
	}
}

function vocabulary(state = null, action) {
	switch (action.type) {
		case 'VOCABULARY_LOADED':
			return action.payload;
		case 'REFRESH':
		case 'SIGN_OUT':
			return null;
		default:
			return state;
	}
}

export default combineReducers({ apiKey, radicals, kanji, vocabulary });
