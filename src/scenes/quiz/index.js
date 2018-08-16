import React, { PureComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import {
	Content,
	Card,
	CardItem,
	DeckSwiper,
	Text,
	Body,
	Button,
	Icon
} from "native-base";

const initialState = {
	counter: 1,
	questionIndex: 0,
	correta: 0,
	errada: 0,
	showQuestion: true,
	complete: false
};

class Quiz extends PureComponent {
	state = {
		counter: 1,
		questionIndex: 0,
		correta: 0,
		errada: 0,
		showQuestion: true,
		complete: false
	};

	handleCorreta() {
		this.setState(prevState => {
			const maxLength = this.props.questions.length;
			const complete = prevState.counter === maxLength;
			const counter = complete ? prevState.counter : prevState.counter + 1;
			return {
				questionIndex:
					prevState.questionIndex === maxLength - 1
						? prevState.questionIndex
						: prevState.questionIndex + 1,
				correta: prevState.correta + 1,
				counter,
				complete,
				showQuestion: true
			};
		});
	}

	handleErrada() {
		this.setState(prevState => {
			const maxLength = this.props.questions.length;
			const complete = prevState.counter === maxLength;
			const counter = complete ? prevState.counter : prevState.counter + 1;
			return {
				questionIndex:
					prevState.questionIndex === maxLength - 1
						? prevState.questionIndex
						: prevState.questionIndex + 1,
				errada: prevState.errada + 1,
				counter,
				complete,
				showQuestion: true
			};
		});
	}

	handleRestart() {
		this.setState({});
	}

	mostrarResposta() {
		this.setState(prevState => {
			const showQuestion = !prevState.showQuestion;
			return { showQuestion };
		});
	}

	renderResultado() {
		const { correta, errada } = this.state;
		const { title } = this.props.navigation.state.params;
		const score = ((correta / (correta + errada)) * 100).toFixed(0);
		return (
			<Content
				padder
				contentContainerStyle={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center"
				}}>
				<Text style={{ fontSize: 25, fontWeight: "bold" }}>
					Sua pontuação é de {score}
				</Text>
				<Text>Correta: {correta}</Text>
				<Text>Errada: {errada}</Text>
				<Button
					bordered
					style={{
						width: 300,
						marginTop: 10,
						marginBottom: 10,
						justifyContent: "center",
						marginLeft: 20,
						marginRight: 20
					}}
					warning
					onPress={() => this.setState(initialState)}>
					<Text>Recomeçar quiz</Text>
				</Button>
				<Button
					bordered
					style={{
						width: 300,
						marginBottom: 10,
						justifyContent: "center",
						marginLeft: 20,
						marginRight: 20
					}}
					error
					onPress={() => this.props.navigation.goBack()}>
					<Text>Voltar ao baralho</Text>
				</Button>
			</Content>
		);
	}

	render() {
		const { question, answer } = this.props.questions[this.state.questionIndex];
		const questionText = (
			<View>
				<Text style={{ fontSize: 25, fontWeight: "bold" }}>Questão</Text>
				<Text>{question}</Text>
			</View>
		);
		const answerText = (
			<View>
				<Text style={{ fontSize: 25, fontWeight: "bold" }}>Resposta</Text>
				<Text>{answer}</Text>
			</View>
		);

		return !this.state.complete ? (
			<Content padder contentContainerStyle={{ justifyContent: "center" }}>
				<Text style={{ textAlign: "center" }}>
					{this.state.counter}/{this.props.questions.length}
				</Text>
				<Card style={{ height: 250, marginLeft: 20, marginRight: 20 }}>
					<CardItem>
						<Body>{this.state.showQuestion ? questionText : answerText}</Body>
					</CardItem>
				</Card>
				<View style={{ flex: 1, justifyContent: "center" }}>
					<Button
						bordered
						style={{
							width: 300,
							marginBottom: 10,
							justifyContent: "center",
							marginLeft: 20,
							marginRight: 20
						}}
						onPress={this.mostrarResposta.bind(this)}>
						<Text>Mostrar resposta</Text>
					</Button>
					<Button
						bordered
						style={{
							width: 300,
							marginBottom: 10,
							justifyContent: "center",
							marginLeft: 20,
							marginRight: 20
						}}
						iconcorreta
						success
						onPress={this.handleCorreta.bind(this)}>
						<Text>Correta</Text>
					</Button>
					<Button
						bordered
						style={{
							width: 300,
							justifyContent: "center",
							marginLeft: 20,
							marginRight: 20
						}}
						iconLeft
						danger
						onPress={this.handleErrada.bind(this)}>
						<Text>Incorreta</Text>
					</Button>
				</View>
			</Content>
		) : (
			this.renderResultado()
		);
	}
}

function mapStateToProps(data, { navigation }) {
	const { title, restartQuiz } = navigation.state.params;
	return { restartQuiz, questions: data[title].questions };
}

export default connect(mapStateToProps)(Quiz);
