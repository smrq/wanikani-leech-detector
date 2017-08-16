export default function fetchResource(apiKey, resource, callback, failDelay = 1) {
	fetch(`https://www.wanikani.com/api/user/${apiKey}/${resource}`)
		.then(checkResponse)
		.then(parseJson)
		.then(unpackJson)
		.then(callback)
		.catch(error => {
			console.error(error);
			console.warn(`Failed to fetch ${resource}, retrying in ${failDelay} seconds.`);
			setTimeout(
				() => fetchResource(apiKey, resource, callback, failDelay * 2),
				failDelay * 1000);
		});
}

function checkResponse(response) {
	if (response.ok) {
		return response;
	}
	throw new Error('Network response failed.');
}

function parseJson(response) {
	return response.json();
}

function unpackJson(json) {
	if (json.error) {
		throw new Error(json.error);
	}
	return json.requested_information;
}
