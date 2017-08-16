export function srsLevelName(srsNumber) {
	switch (srsNumber) {
		case 9:
			return 'burned';
		case 8:
			return 'enlightened';
		case 7:
			return 'master';
		case 6:
		case 5:
			return 'guru';
		case 4:
		case 3:
		case 2:
		case 1:
			return 'apprentice';
		default:
			throw new Error(`Invalid SRS level: ${srsNumber}`);
	}
}
