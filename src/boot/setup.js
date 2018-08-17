import * as Expo from "expo";
import React, { Component } from "react";
import Home from "../Home";

export default class Setup extends Component {
	state = { isReady: false };

	componentWillMount() {
		this.loadFonts();
	}

	async loadFonts() {
		await Expo.Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
		});
		this.setState({ isReady: true });
	}

	render() {
		return !this.state.isReady ? <Expo.AppLoading /> : <Home />;
	}
}
