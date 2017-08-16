export default function sortItems(items, sort, sortDescending) {
	const sortFunction = getSortFunction(sort);
	const sortDirectionFunction = sortDescending ? descending : ascending;
	if (sortFunction) {
		items.sort(sortDirectionFunction(sortFunction));
	}
}

function getSortFunction(sort) {
	switch (sort) {
		case 'score':
			return (a, b) => byScore(a, b) || bySrs(a, b);
		case 'srs':
			return (a, b) => bySrs(a, b) || byScore(a, b);
		case 'streak':
			return (a, b) => byStreak(b, a) || byScore(a, b) || bySrs(a, b);
		case 'wrongCount':
			return (a, b) => byWrongCount(a, b) || byScore(a, b) || bySrs(a, b);
		default:
			return;
	}
}

function descending(sort) {
	return sort;
}

function ascending(sort) {
	return (a, b) => sort(b, a);
}

function byScore(a, b) {
	const aScore = a.wrongCount / a.streak;
	const bScore = b.wrongCount / b.streak;
	return bScore - aScore;
}

function byWrongCount(a, b) {
	return b.wrongCount - a.wrongCount;
}

function bySrs(a, b) {
	return b.srs - a.srs;
}

function byStreak(a, b) {
	return b.streak - a.streak;
}
