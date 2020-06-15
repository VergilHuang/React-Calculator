import { ActionType, ActionCreatorReturnType } from './actions'
import { MathSymbolEnum } from '../enums'

export interface StoreState {
	curVal: string,
	calculation: string[],
	symbol: MathSymbolEnum,
	flag: boolean,
	showType: "calc" | "cur"
}

const initialState: StoreState = {
	curVal: "0",
	calculation: [],
	symbol: MathSymbolEnum.none,
	flag: false,
	showType: "cur"
}

const reducers = (state = initialState, action: ActionCreatorReturnType) => {
	switch (action.type) {
		case ActionType.SET_CUR_VALUE:
			return {
				...state,
				curVal: action.payload
			}
		case ActionType.SET_CALCULATION:
			return {
				...state,
				calculation: action.payload
			}
		case ActionType.SET_SYMBOL:
			return {
				...state,
				symbol: action.payload
			}
		case ActionType.SET_FLAG:
			return {
				...state,
				flag: action.payload
			}
		case ActionType.SET_ShowType:
			return {
				...state,
				showType: action.payload
			}
		default:
			return state
	}
}

export default reducers
