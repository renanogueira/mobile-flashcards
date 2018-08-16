import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";

import DeckList from "../scenes/deck/DeckList";
import NewDeck from "../scenes/deck/NewDeck";

export default class AppTabNavigation extends PureComponent {
	render() {
		const { navigation } = this.props;
		const deckList = () => <DeckList navigation={navigation} />;
		const newDeck = () => <NewDeck navigationApp={navigation} />;
		const Tabs = createMaterialTopTabNavigator(
			{
				DeckList: {
					screen: deckList,
					navigationOptions: {
						tabBarLabel: "Baralhos",
						tabBarIcon: ({ tintColor }) => (
							<FontAwesome name="list" size={20} color={tintColor} />
						)
					}
				},
				NewDeck: {
					screen: newDeck,
					navigationOptions: {
						tabBarLabel: "Novo baralho",
						tabBarIcon: ({ tintColor }) => (
							<FontAwesome name="plus" size={20} color={tintColor} />
						)
					}
				}
			},
			{
				tabBarPosition: "bottom",
				tabBarOptions: {
					showIcon: true,
					upperCaseLabel: false,
					style: {
						backgroundColor: "#d32f2f",
						borderTopWidth: 1,
						borderTopColor: "#ff6659"
					},
					indicatorStyle: {
						backgroundColor: "#9a0007"
					}
				},
				style: {
					backgroundColor: "#e9e9e9"
				}
			}
		);
		return <Tabs />;
	}
}
