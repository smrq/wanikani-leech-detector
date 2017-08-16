import React from 'react';
import cx from 'classnames';
import styles from './Loading.scss';

export default function Loading(props) {
	const { radicals, kanji, vocabulary } = props;
	return (
		<section className="section is-medium">
			<div className="container has-text-centered">
				<div className={styles.spinnerWrapper}>
					<div className={styles.spinner} />
				</div>
			</div>
			<div className="container has-text-centered">
				<div className="columns">
					<div className={cx("column", styles.loading, styles.radicals)}>
						<div>
							<p className={styles.heading}>Radicals</p>
							<p className={cx("title", radicals && styles.pulse)}>{radicals ? 'Loading' : 'Done'}</p>
						</div>
					</div>
					<div className={cx("column", styles.loading, styles.kanji)}>
						<div>
							<p className={styles.heading}>Kanji</p>
							<p className={cx("title", kanji && styles.pulse)}>{kanji ? 'Loading' : 'Done'}</p>
						</div>
					</div>
					<div className={cx("column", styles.loading, styles.vocabulary)}>
						<div>
							<p className={styles.heading}>Vocabulary</p>
							<p className={cx("title", vocabulary && styles.pulse)}>{vocabulary ? 'Loading' : 'Done'}</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
