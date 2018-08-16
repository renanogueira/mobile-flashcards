import React, { PureComponent } from "react";
import { View, KeyboardAvoidingView, Keyboard } from "react-native";
import { connect } from "react-redux";
import { Input, Item, Text, Button } from "native-base";

import { addCard } from "../../actions";

class NewCard extends PureComponent {
	state = {
		questionText: "",
		answerText: "",
		buttonDisable: true
	};

	setQuestion(questionText) {
		const noQuestion = !!!questionText;
		const noAnswer = !!!this.state.answerText;
		const buttonDisable = noQuestion || noAnswer;
		this.setState({ questionText, buttonDisable });
	}

	setAnswer(answerText) {
		const noQuestion = !!!this.state.questionText;
		const noAnswer = !!!answerText;
		const buttonDisable = noQuestion || noAnswer;
		this.setState({ answerText, buttonDisable });
	}

	saveToDeck() {
		const { addCard, title, navigation, item, refresh } = this.props;
		const { questionText, answerText } = this.state;
		addCard(title, { question: questionText, answer: answerText }).then(() => {
			this.setState({ questionText: "", answerText: "", buttonDisable: true });
			refresh();
			navigation.goBack();
		});
	}

	render() {
		const buttonDisable = (
			<Button bordered disabled>
				<Text> Confirmar </Text>
			</Button>
		);
		const button = this.state.buttonDisable ? (
			buttonDisable
		) : (
			<Button
				bordered
				onPress={this.saveToDeck.bind(this)}
				style={{ borderColor: "#303f9f" }}>
				<Text style={{ color: "#303f9f" }}> Confirmar </Text>
			</Button>
		);
		return (
			<KeyboardAvoidingView
				behavior="padding"
				style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<View>
					<Item regular style={{ width: 300 }}>
						<Input
							placeholder="Questão"
							value={this.state.questionText}
							onChangeText={this.setQuestion.bind(this)}
						/>
					</Item>
				</View>
				<View>
					<Item regular style={{ marginTop: 15, marginBottom: 15, width: 300 }}>
						<Input
							placeholder="Resposta"
							value={this.state.answerText}
							onChangeText={this.setAnswer.bind(this)}
						/>
					</Item>
				</View>
				<View>{button}</View>
			</KeyboardAvoidingView>
		);
	}
}

function mapStateToProps(data, { navigation }) {
	const { title, refresh } = navigation.state.params;
	return {
		refresh,
		title,
		item: data[title],
		questionList: Object.keys(data[title].questions.map(item => item.question))
	};
}

function mapDispatchToProps(dispatch) {
	return { addCard: (title, card) => dispatch(addCard(title, card)) };
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewCard);
