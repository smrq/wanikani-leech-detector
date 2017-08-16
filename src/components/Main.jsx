import React from 'react';
import ItemScores from './ItemScores';
import ItemCounts from './ItemCounts';
import sortItems from '../sortItems';
import { srsLevelName } from '../srs';

export default function Main({ radicals, kanji, vocabulary }) {
	return (
		<section className="section">
			<div className="container">
				<div className="columns">
					<ItemScores className="column" radicals={radicals} kanji={kanji} vocabulary={vocabulary} />
					<ItemCounts className="column" radicals={radicals} kanji={kanji} vocabulary={vocabulary} />
				</div>
			</div>
		</section>
	);
}
