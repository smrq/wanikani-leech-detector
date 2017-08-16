import React from 'react';
import cx from 'classnames';
import sortItems from '../sortItems';
import { srsLevelName } from '../srs';
import styles from './ItemScores.scss';

export default class ItemScores extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			sort: 'score',
			sortDescending: true,
			count: 50,
			includeBurned: false
		};
	}

	render() {
		const { className, kanji, vocabulary } = this.props;
		const { sort, sortDescending, count, includeBurned } = this.state;

		const items = [...kanji, ...vocabulary];

		let limitedItems = items;
		if (!includeBurned) {
			limitedItems = limitedItems.filter(item => !item.burned);
		}
		sortItems(limitedItems, sort, sortDescending);
		limitedItems = limitedItems.slice(0, count);

		return (
			<div className={className}>
				<p>
					<label>
						<input type="checkbox" checked={includeBurned} onChange={this.handleIncludeBurnedChange} /> Include burned items
					</label>
				</p>
				<table className="table">
					<thead>
						<tr>
							<th>Item</th>
							<th>Type</th>
							<th className={styles.sortColumn} onClick={this.handleSortSrs}>SRS</th>
							<th className={styles.sortColumn} onClick={this.handleSortWrongCount}>Wrong</th>
							<th className={styles.sortColumn} onClick={this.handleSortStreak}>Streak</th>
							<th className={styles.sortColumn} onClick={this.handleSortScore}>Score</th>
						</tr>
					</thead>
					<tbody>
						{limitedItems.map(item => (
							<tr key={`${item.itemType}/${item.name}/${item.type}`}>
								<td className={cx(styles.item, styles[item.itemType])}>
									<a href={`https://www.wanikani.com/${item.itemType}/${item.name}`} target="_blank">
										{item.name}
									</a>
								</td>
								<td>{item.type}</td>
								<td className={cx(styles.srs, styles[srsLevelName(item.srs)])}>{item.srs}</td>
								<td className="wrong-count">{item.wrongCount}</td>
								<td className="streak">{item.streak}</td>
								<td className="score">{item.score.toFixed(1)}</td>
							</tr>
						))}
					</tbody>
				</table>
				{items.length > limitedItems.length && (
					<p>
						<a href="javascript:void(0)" onClick={this.handleShowMore}>Show more</a>
					</p>
				)}
			</div>
		);
	}

	handleSortSrs = () => {
		this.handleSortBy('srs');
	};

	handleSortWrongCount = () => {
		this.handleSortBy('wrongCount');
	};

	handleSortScore = () => {
		this.handleSortBy('score');
	};

	handleSortStreak = () => {
		this.handleSortBy('streak');
	};

	handleSortBy = (sort) => {
		this.setState(state => ({
			sort,
			sortDescending: state.sort === sort ? !state.sortDescending : true,
			count: 50
		}));
	};

	handleShowMore = () => {
		this.setState(state => ({ count: state.count + 50 }));
	};

	handleIncludeBurnedChange = () => {
		this.setState(state => ({ includeBurned: !state.includeBurned }));
	};
}
