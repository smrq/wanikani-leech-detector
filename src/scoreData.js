export default function scoreData(itemType, data) {
	const result = [];
	data
		.filter(item => item.user_specific != null)
		.forEach(item => {
			const name = item.character;
			const details = item.user_specific;

			result.push({
				itemType,
				name,
				type: 'Meaning',
				srs: details.srs_numeric,
				burned: details.burned,
				wrongCount: details.meaning_incorrect,
				streak: details.meaning_current_streak,
				score: details.meaning_incorrect / details.meaning_current_streak
			});
			result.push({
				itemType,
				name,
				type: 'Reading',
				srs: details.srs_numeric,
				burned: details.burned,
				wrongCount: details.reading_incorrect,
				streak: details.reading_current_streak,
				score: details.reading_incorrect / details.reading_current_streak
			});
		});
	return result;
}
