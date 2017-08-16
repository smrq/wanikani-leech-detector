import React from 'react';
import ApiEntry from './ApiEntry';
import Loading from './Loading';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import fetchResource from '../fetchResource';
import { storeLocalData, clearLocalData } from '../localStorage';
import scoreData from '../scoreData';

export default class App extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			apiKey: props.apiKey,
			kanji: props.kanji,
			vocabulary: props.vocabulary
		};
	}

	render() {
		const { kanji, vocabulary, apiKey } = this.state;
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
		if (this.state.apiKey && !(this.state.kanji && this.state.vocabulary)) {
			this.loadData();
		}
	}

	handleApiEntry = (apiKey) => {
		storeLocalData('wanikani_leech_apikey', apiKey);
		this.setState({ apiKey }, this.loadData);
	};

	loadData = () => {
		const { apiKey } = this.state;
		fetchResource(apiKey, 'vocabulary', data => {
			const vocabulary = scoreData('vocabulary', data.general);
			storeLocalData('wanikani_leech_vocabulary', vocabulary, 1000*60*5);
			this.setState({ vocabulary });
		});
		fetchResource(apiKey, 'kanji', data => {
			const kanji = scoreData('kanji', data);
			storeLocalData('wanikani_leech_kanji', kanji, 1000*60*5);
			this.setState({ kanji });
		});
	};

	handleRefresh = () => {
		clearLocalData('wanikani_leech_vocabulary');
		clearLocalData('wanikani_leech_kanji');
		this.setState({
			kanji: null,
			vocabulary: null
		}, this.loadData);
	};

	handleSignOut = () => {
		clearLocalData('wanikani_leech_vocabulary');
		clearLocalData('wanikani_leech_kanji');
		clearLocalData('wanikani_leech_apikey');
		this.setState({
			apiKey: null,
			kanji: null,
			vocabulary: null
		});
	};
}
