import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import sortItems from '../sortItems';
import { srsCountSelector } from '../selectors';
import { srsLevelName } from '../srs';
import styles from './ItemCounts.scss';

function ItemCounts({ className, srsCount }) {
	return (
		<div className={className}>
			<table className="table">
				<tbody>
					{['4h','8h','24h','3d','1w','2w','1m','4m','∞'].map((text, n) => (
						<tr key={n}>
							<th>{text}</th>
							<td className={cx(styles.srs, styles[srsLevelName(n+1)])}>
								{srsCount[n]}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		srsCount: srsCountSelector(state)
	};
}

export default connect(mapStateToProps)(ItemCounts);
