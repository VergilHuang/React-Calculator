export enum ActionType {
    SET_CALC_VALUE = "SET_CALC_VALUE",
}

export interface ActionCreatorReturnType {
    type: ActionType,
    payload?: any
}

export const setCalcVal = (calcVal: string): ActionCreatorReturnType => ({ type: ActionType.SET_CALC_VALUE, payload: calcVal });

