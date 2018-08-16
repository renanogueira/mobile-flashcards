import { getDecks, saveDeckTitle, addCardToDeck } from "../utils";

export const ADD_DECK = "ADD_DECK";
export const GET_DECKS = "GET_DECKS";
export const ADD_CARD = "ADD_CARD";

export const addDeck = title => dispatch =>
	saveDeckTitle(title).then(() => dispatch({ type: ADD_DECK, title }));

export const fetchDecks = () => dispatch =>
	getDecks().then(decks => dispatch({ type: GET_DECKS, decks }));

export const addCard = (title, card) => dispatch =>
	addCardToDeck(title, card).then(() =>
		dispatch({ type: ADD_CARD, title, card })
	);
