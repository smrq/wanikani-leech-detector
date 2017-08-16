import React from 'react';
import cx from 'classnames';
import sortItems from '../sortItems';
import { srsLevelName } from '../srs';
import styles from './ItemCounts.scss';

export default function ItemCounts({ className, kanji, vocabulary }) {
	const items = [...kanji, ...vocabulary];
	return (
		<div className={className}>
			<table className="table">
				<tbody>
					{['4h','8h','24h','3d','1w','2w','1m','4m','∞'].map((text, n) => (
						<tr key={n}>
							<th>{text}</th>
							<td className={cx(styles.srs, styles[srsLevelName(n+1)])}>
								{items.filter(item => item.srs === n+1).length / 2}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
