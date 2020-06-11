import { ActionType, ActionCreatorReturnType } from './actions'

export interface StoreState {
	calcVal: string,

}

const initialState: StoreState = {
	calcVal: "0",

}

const reducers = (state = initialState, action: ActionCreatorReturnType) => {
	switch (action.type) {
		case ActionType.SET_CALC_VALUE:
			return {
				...state,
				calcVal: action.payload
			}
		default:
			return state
	}
}

export default reducers
