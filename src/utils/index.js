import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

const STORAGE_KEY = "flashcards:STORAGE_KEY";
const NOTIFICATION_KEY = "flashcards:NOTIFICATION_KEY";

export const initialData = {
	React: {
		title: "React",
		questions: [
			{
				question: "What is React?",
				answer: "A library for managing user interfaces"
			},
			{
				question: "Where do you make Ajax requests in React?",
				answer: "The componentDidMount lifecycle event"
			}
		]
	},
	JavaScript: {
		title: "JavaScript",
		questions: [
			{
				question: "What is a closure?",
				answer:
					"The combination of a function and the lexical environment within which that function wasdeclared."
			}
		]
	}
};

export const getDecks = () => {
	return AsyncStorage.getItem(STORAGE_KEY).then(response => {
		if (response == null) {
			AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
			return initialData;
		} else return JSON.parse(response);
	});
};

export const getDeck = id => {
	return AsyncStorage.getItem(STORAGE_KEY).then(response => {
		const data = JSON.parse(response);
		return data[id];
	});
};

export const saveDeckTitle = title => {
	return AsyncStorage.mergeItem(
		STORAGE_KEY,
		JSON.stringify({ [title]: { title, questions: [] } })
	);
};

export const addCardToDeck = (title, card) => {
	return AsyncStorage.getItem(STORAGE_KEY)
		.then(response => {
			return JSON.parse(response)[title];
		})
		.then(data => {
			const { question, answer } = card;
			const questions = data.questions.concat({ question, answer });
			AsyncStorage.mergeItem(
				STORAGE_KEY,
				JSON.stringify({ [title]: { title, questions } })
			);
		});
};

export const clearNotification = () => {
	return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
		Notifications.cancelAllScheduledNotificationsAsync
	);
};

export const setDailyNotification = () => {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then(data => {
			if (data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
					if (status === "granted") {
						Notifications.cancelAllScheduledNotificationsAsync();

						let tomorrow = new Date();
						tomorrow.setDate(tomorrow.getDate() + 1);
						tomorrow.setHours(20);
						tomorrow.setMinutes(0);

						Notifications.scheduleLocalNotificationAsync(createNotification(), {
							time: tomorrow,
							repeat: "day"
						});
						AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
					}
				});
			}
		});
};

const createNotification = () => {
	return {
		title: "Hora de Quiz",
		body: "Não se esqueça de realizar um quiz dos seus baralhos! :)",
		ios: { sound: true },
		android: { sound: true, priority: "high", sticky: false, vibrate: true }
	};
};
