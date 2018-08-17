import React, { Component } from "react";
import { Header, Container } from "native-base";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { StatusBar, Text, View } from "react-native";
import { Constants } from "expo";

import reducer from "./reducers";
import { setDailyNotification } from "./utils";
import DeckListNavigation from "./components/DeckListNavigation";

export default class Home extends Component {
	componentDidMount() {
		setDailyNotification();
	}
	render() {
		return (
			<Provider store={createStore(reducer, applyMiddleware(thunk))}>
				<Container style={{ flex: 1 }}>
					<StatusBar translucent barStyle="light-content" />
					<DeckListNavigation />
				</Container>
			</Provider>
		);
	}
}
