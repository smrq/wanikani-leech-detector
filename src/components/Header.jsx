import React from 'react';

export default function Header({ apiKey, onRefresh, onSignOut }) {
	return (
		<header>
			<nav className="navbar">
				<div className="navbar-brand">
					<span className="navbar-item"><strong>WaniKani Leech Detector</strong></span>
					{apiKey && <a className="navbar-item" href="javascript:void(0)" onClick={onRefresh}>Refresh</a>}
					{apiKey && <a className="navbar-item" href="javascript:void(0)" onClick={onSignOut}>Sign Out</a>}
				</div>
			</nav>
		</header>
	);
}
