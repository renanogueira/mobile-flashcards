import React, { PureComponent } from "react";
import { View, KeyboardAvoidingView, Keyboard } from "react-native";
import { connect } from "react-redux";
import { Input, Item, Text, Button } from "native-base";
import { Constants } from "expo";

import { addDeck } from "../../actions";

class NewDeck extends PureComponent {
	state = { input: "", buttonDisable: true };

	setTitle(title) {
		const noTitle = !!!title;
		const hasExistingTitle = this.props.deckList.includes(title);
		const buttonDisable = noTitle || hasExistingTitle;
		this.setState({ input: title, buttonDisable });
	}

	createDeck() {
		const { navigation, navigationApp } = this.props;
		const title = this.state.input;
		Keyboard.dismiss();
		this.props.addDeck(title).then(() => {
			this.setState({ input: "", buttonDisable: true });
			navigationApp.navigate("deck", { title });
		});
	}

	render() {
		const disabledButton = (
			<Button bordered disabled>
				<Text>Criar baralho</Text>
			</Button>
		);
		const submitButton = (
			<Button
				bordered
				onPress={this.createDeck.bind(this)}
				style={{ borderColor: "#d32f2f" }}>
				<Text style={{ color: "#d32f2f" }}>Criar baralho</Text>
			</Button>
		);
		const button = this.state.buttonDisable ? disabledButton : submitButton;

		return (
			<KeyboardAvoidingView
				behavior="padding"
				style={{
					flex: 1,
					paddingTop: Constants.statusBarHeight + 30,
					alignItems: "center"
				}}>
				<Text
					style={{
						fontSize: 25,
						fontWeight: "bold",
						textAlign: "center"
					}}>
					Dê um nome para o novo baralho
				</Text>
				<Item regular style={{ marginTop: 15, marginBottom: 10, width: 300 }}>
					<Input
						placeholder="Título"
						onChangeText={this.setTitle.bind(this)}
						value={this.state.input}
					/>
				</Item>
				<View>{button}</View>
			</KeyboardAvoidingView>
		);
	}
}

function mapStateToProps(data) {
	return { deckList: Object.keys(data) };
}

function mapDispatchToProps(dispatch) {
	return { addDeck: title => dispatch(addDeck(title)) };
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewDeck);
