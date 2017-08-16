import React from 'react';
import ItemScores from './ItemScores';
import ItemCounts from './ItemCounts';
import sortItems from '../sortItems';
import { srsLevelName } from '../srs';

export default function Main({ kanji, vocabulary }) {
	return (
		<section className="section">
			<div className="container">
				<div className="columns">
					<ItemScores className="column" kanji={kanji} vocabulary={vocabulary} />
					<ItemCounts className="column" kanji={kanji} vocabulary={vocabulary} />
				</div>
			</div>
		</section>
	);
}
