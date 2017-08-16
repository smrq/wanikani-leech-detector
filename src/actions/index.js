import fetchResource from '../fetchResource';
import scoreData from '../scoreData';
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

function loadData() {
	return (dispatch, getState) => {
		const { apiKey } = getState();

		fetchResource(apiKey, 'vocabulary', data => {
			const vocabulary = scoreData('vocabulary', data.general);
			storeLocalData('wanikani_leech_vocabulary', vocabulary, 1000*60*5);
			dispatch({ type: 'VOCABULARY_LOADED', payload: vocabulary });
		});

		fetchResource(apiKey, 'kanji', data => {
			const kanji = scoreData('kanji', data);
			storeLocalData('wanikani_leech_kanji', kanji, 1000*60*5);
			dispatch({ type: 'KANJI_LOADED', payload: kanji });
		});
	};
}
