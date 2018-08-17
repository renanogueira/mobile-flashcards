import React, { PureComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { Button, Text } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { fetchDecks } from "../../actions";

import { clearNotification, setNotification } from "../../utils";

class Deck extends PureComponent {
	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params;
		return { title };
	};

	render() {
		const { navigation, questions } = this.props;
		const { title } = navigation.state.params;
		const cardCount = questions.length;
		const cardCountText = cardCount + " carta" + (cardCount > 1 ? "s" : "");

		return (
			<View
				style={{
					flex: 1,
					justifyContent: "space-around",
					alignItems: "center"
				}}>
				<View style={{ alignItems: "center" }}>
					<Text style={{ fontSize: 25, fontWeight: "bold" }}>{title}</Text>
					<Text>{cardCountText}</Text>
				</View>
				<View style={{ justifyContent: "center" }}>
					<Button
						onPress={() => navigation.navigate("newCard", { title })}
						bordered
						style={{
							borderColor: "#d32f2f",
							marginRight: 10,
							marginBottom: 10,
							width: 300,
							justifyContent: "center"
						}}>
						<Text style={{ color: "#d32f2f" }}>Criar nova pergunta</Text>
					</Button>
					{cardCount === 0 ? (
						<Button
							disabled
							bordered
							style={{ width: 300, justifyContent: "center" }}>
							<Text>Começar um quiz</Text>
						</Button>
					) : (
						<Button
							onPress={() => {
								navigation.navigate("quiz", { title });
								clearNotification().then(setNotification);
							}}
							bordered
							style={{
								borderColor: "#d32f2f",
								width: 300,
								justifyContent: "center"
							}}>
							<Text style={{ color: "#d32f2f" }}>Começar um quiz</Text>
						</Button>
					)}
				</View>
			</View>
		);
	}
}

function mapStateToProps(data, { navigation }) {
	const { title } = navigation.state.params;
	return { questions: data[title].questions };
}

export default connect(mapStateToProps)(Deck);
