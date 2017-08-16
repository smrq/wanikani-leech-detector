import { createSelector } from 'reselect';

const radicalsSelector = state => state.radicals;
const kanjiSelector = state => state.kanji;
const vocabularySelector = state => state.vocabulary;

const itemsSelector = createSelector(
	radicalsSelector,
	kanjiSelector,
	vocabularySelector,
	(radicals, kanji, vocabulary) => [
		...radicals.map(item => ({ ...item, type: 'radicals' })),
		...kanji.map(item => ({ ...item, type: 'kanji' })),
		...vocabulary.map(item => ({ ...item, type: 'vocabulary' }))
	].filter(item => item.user_specific != null));

export const scoredItemsSelector = createSelector(
	itemsSelector,
	items => {
		const result = [];
		items.forEach(item => {
			result.push({
				itemType: item.type,
				name: item.character,
				type: 'Meaning',
				srs: item.user_specific.srs_numeric,
				burned: item.user_specific.burned,
				wrongCount: item.user_specific.meaning_incorrect,
				streak: item.user_specific.meaning_current_streak,
				score: item.user_specific.meaning_incorrect / item.user_specific.meaning_current_streak
			});

			if (item.user_specific.reading_incorrect !== null) {
				result.push({
					itemType: item.type,
					name: item.character,
					type: 'Reading',
					srs: item.user_specific.srs_numeric,
					burned: item.user_specific.burned,
					wrongCount: item.user_specific.reading_incorrect,
					streak: item.user_specific.reading_current_streak,
					score: item.user_specific.reading_incorrect / item.user_specific.reading_current_streak
				});
			}
		});
		return result;
	});

export const srsCountSelector = createSelector(
	itemsSelector,
	items => [1,2,3,4,5,6,7,8,9].map(n => items.filter(item => item.user_specific.srs_numeric === n).length));
