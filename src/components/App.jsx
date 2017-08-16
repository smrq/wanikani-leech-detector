import React from 'react';
import { connect } from 'react-redux';
import ApiEntry from './ApiEntry';
import Loading from './Loading';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import * as actions from '../actions';

class App extends React.PureComponent {
	render() {
		const { kanji, vocabulary, apiKey } = this.props;
		return (
			<div>
				<Header apiKey={apiKey} onRefresh={this.handleRefresh} onSignOut={this.handleSignOut} />
				<main>
					{
						(kanji && vocabulary) ? <Main kanji={kanji} vocabulary={vocabulary} /> :
						apiKey ? <Loading kanji={kanji == null} vocabulary={vocabulary == null} /> :
						<ApiEntry onEnter={this.handleApiEntry} />
					}
				</main>
				<Footer />
			</div>
		);
	}

	componentDidMount() {
		if (this.props.apiKey && !(this.props.kanji && this.props.vocabulary)) {
			this.props.dispatch(actions.loadData());
		}
	}

	handleApiEntry = (apiKey) => {
		this.props.dispatch(actions.setApiKey(apiKey));
	};

	handleRefresh = () => {
		this.props.dispatch(actions.refresh());
	};

	handleSignOut = () => {
		this.props.dispatch(actions.signOut());
	};
}

function mapStateToProps(state) {
	const { apiKey, kanji, vocabulary } = state;
	return { apiKey, kanji, vocabulary };
}

export default connect(mapStateToProps)(App);
