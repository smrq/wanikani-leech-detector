import React from 'react';
import cx from 'classnames';
import styles from './Loading.scss';

export default function Loading(props) {
	const { kanji, vocabulary } = props;
	return (
		<section className="section is-medium">
			<div className="container has-text-centered">
				<nav className="level">
					<div className={cx("level-item", styles.loadingKanji)}>
						<div>
							<p className={styles.heading}>Kanji</p>
							<p className={cx("title", kanji && styles.pulse)}>{kanji ? 'Loading' : 'Done'}</p>
						</div>
					</div>
					<div className="level-item">
						<div className={styles.spinnerWrapper}>
							<div className={styles.spinner} />
						</div>
					</div>
					<div className={cx("level-item", styles.loadingVocabulary)}>
						<div>
							<p className={styles.heading}>Vocabulary</p>
							<p className={cx("title", vocabulary && styles.pulse)}>{vocabulary ? 'Loading' : 'Done'}</p>
						</div>
					</div>
				</nav>
			</div>
		</section>
	);
}
