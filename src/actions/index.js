import fetchResource from '../fetchResource';
import { storeLocalData, clearLocalData } from '../localStorage';

export function setApiKey(apiKey) {
	return (dispatch) => {
		storeLocalData('wanikani_leech_apikey', apiKey);
		dispatch({ type: 'SET_API_KEY', payload: apiKey });
		dispatch(loadData());
	};
}

export function refresh() {
	return (dispatch) => {
		clearLocalData('wanikani_leech_radicals');
		clearLocalData('wanikani_leech_kanji');
		clearLocalData('wanikani_leech_vocabulary');
		dispatch({ type: 'REFRESH' });
		dispatch(loadData());
	};
}

export function signOut() {
	return (dispatch) => {
		clearLocalData('wanikani_leech_apikey');
		clearLocalData('wanikani_leech_radicals');
		clearLocalData('wanikani_leech_kanji');
		clearLocalData('wanikani_leech_vocabulary');
		dispatch({ type: 'SIGN_OUT' });
	};
}

export function loadData() {
	return (dispatch, getState) => {
		const { apiKey } = getState();

		fetchResource(apiKey, 'radicals', data => {
			storeLocalData('wanikani_leech_kanji', data, 1000*60*5);
			dispatch({ type: 'RADICALS_LOADED', payload: data });
		});

		fetchResource(apiKey, 'kanji', data => {
			storeLocalData('wanikani_leech_kanji', data, 1000*60*5);
			dispatch({ type: 'KANJI_LOADED', payload: data });
		});

		fetchResource(apiKey, 'vocabulary', data => {
			storeLocalData('wanikani_leech_vocabulary', data.general, 1000*60*5);
			dispatch({ type: 'VOCABULARY_LOADED', payload: data.general });
		});
	};
}
