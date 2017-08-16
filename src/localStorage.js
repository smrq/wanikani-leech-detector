export function storeLocalData(key, data, expiration) {
	localStorage.setItem(key, JSON.stringify({
		data,
		expires: expiration && (Date.now() + expiration)
	}));
}

export function retrieveLocalData(key) {
	let stored = localStorage.getItem(key);
	if (!stored) {
		return null;
	}

	stored = JSON.parse(stored);
	if (stored.expires && Date.now() > stored.expires) {
		localStorage.removeItem(key);
		return null;
	}

	return stored.data;
}

export function clearLocalData(key) {
	localStorage.removeItem(key);
}
