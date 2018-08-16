import { createStackNavigator } from "react-navigation";

import AppTabNavigator from "./AppTabNavigation";
import Quiz from "../scenes/quiz";
import Deck from "../scenes/deck";
import Card from "../scenes/card";

const DeckListNavigator = createStackNavigator({
	deckList: {
		screen: AppTabNavigator,
		navigationOptions: { header: null }
	},
	deck: {
		screen: Deck,
		navigationOptions: {
			headerStyle: { backgroundColor: "#d32f2f" },
			headerTintColor: "#fff"
		}
	},
	quiz: {
		screen: Quiz,
		navigationOptions: {
			title: "Quiz",
			headerStyle: { backgroundColor: "#7b1fa2" },
			headerTintColor: "#fff"
		}
	},
	newCard: {
		screen: Card,
		navigationOptions: {
			title: "Nova carta",
			headerStyle: { backgroundColor: "#303f9f" },
			headerTintColor: "#fff"
		}
	}
});

export default DeckListNavigator;
