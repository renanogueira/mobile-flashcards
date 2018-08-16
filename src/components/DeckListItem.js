import React, { PureComponent } from "react";
import { View, TouchableOpacity } from "react-native";
import { Card, CardItem, Icon, Right, Text } from "native-base";

export default class DeckListItem extends PureComponent {
	render() {
		const { item, navigation } = this.props;
		const cardCount = item.questions.length;
		const cardCountText =
			cardCount === 0
				? "Nenhuma carta"
				: cardCount + " carta" + (cardCount > 1 ? "s" : "");
		return (
			<TouchableOpacity
				onPress={() => navigation.navigate("deck", { title: item.title })}>
				<Card
					style={{ marginLeft: 30, marginRight: 50, width: 300, height: 120 }}>
					<CardItem
						style={{
							flex: 1,
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center"
						}}>
						<View style={{ flex: 1 }}>
							<Text style={{ fontSize: 25, fontWeight: "bold" }}>
								{item.title}
							</Text>
							<Text>{cardCountText}</Text>
						</View>
						<Right style={{ paddingRight: 5 }}>
							<Icon name="arrow-forward" />
						</Right>
					</CardItem>
				</Card>
			</TouchableOpacity>
		);
	}
}
