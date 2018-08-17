import { GET_DECKS, ADD_DECK, ADD_CARD } from "../actions";
import { initialData } from "../utils";

function flashcards(state = initialData, action) {
	switch (action.type) {
		case GET_DECKS:
			return action.decks;
		case ADD_DECK: {
			const { title } = action;
			return { ...state, [title]: { title, questions: [] } };
		}
		case ADD_CARD: {
			const { title, card } = action;
			return {
				...state,
				[title]: { title, questions: state[title].questions.concat(card) }
			};
		}
		default:
			return state;
	}
}

export default flashcards;
