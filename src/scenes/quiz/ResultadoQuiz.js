import React, { PureComponent } from "react";
import { Content, Text, Button } from "native-base";
import { clearNotification, setDailyNotification } from "../../utils";

export default class ResultadoQuiz extends PureComponent {
	componentDidMount() {
		clearNotification().then(() => setDailyNotification());
	}

	render() {
		const { correta, errada } = this.props;
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
					onPress={this.props.reiniciar}>
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
					onPress={this.props.navigation}>
					<Text>Voltar ao baralho</Text>
				</Button>
			</Content>
		);
	}
}
