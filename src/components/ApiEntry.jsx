import React from 'react';

export default class ApiEntry extends React.PureComponent {
	render() {
		return (
			<section className="section is-medium">
				<div className="container">
					<h1 className="title">WaniKani Leech Detector</h1>
					<h2 className="subtitle">Get started by entering your API Version 1 Key.</h2>
					<form onSubmit={this.handleSubmit}>
						<div className="columns">
							<div className="column is-half">
								<div className="field" >
									<div className="field has-addons">
										<div className="control is-expanded">
											<input className="input" type="text" name="apiKey" placeholder="546573744b6579506c7349676e6f7265" />
										</div>
										<div className="control">
											<button className="button is-primary" type="submit">Submit</button>
										</div>
									</div>
									<p className="help">You can find your API key in your <a href="https://www.wanikani.com/settings/account#public-api-key" target="_blank">WaniKani Account Settings</a>.</p>
								</div>
							</div>
						</div>
					</form>
				</div>
			</section>
		);
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.onEnter(event.currentTarget.apiKey.value);
	};
}
