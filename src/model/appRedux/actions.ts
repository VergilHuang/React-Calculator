import { MathSymbolEnum } from "../enums";

export enum ActionType {
    SET_IS_MOBILE = "SET_IS_MOBILE",
    SET_CUR_VALUE = "SET_CALC_VALUE",
    SET_CALCULATION = "SET_CALCULATION",
    SET_SYMBOL = "SET_SYMBOL",
    SET_FLAG = "SET_FLAG",
    SET_ShowType = "SET_ShowType",

}

export interface ActionCreatorReturnType {
    type: ActionType,
    payload?: any
}
const setIsMobile = (isMobile: boolean): ActionCreatorReturnType => ({ type: ActionType.SET_IS_MOBILE, payload: isMobile })
const setCurVal = (curVal: string): ActionCreatorReturnType => ({ type: ActionType.SET_CUR_VALUE, payload: curVal });
const setCalculation = (matrix: string[]): ActionCreatorReturnType => ({ type: ActionType.SET_CALCULATION, payload: matrix });
const setSymbol = (symbol: MathSymbolEnum): ActionCreatorReturnType => ({ type: ActionType.SET_SYMBOL, payload: symbol });
const setFlag = (flag: boolean): ActionCreatorReturnType => ({ type: ActionType.SET_FLAG, payload: flag });
const setShowType = (showType: "calc" | "cur"): ActionCreatorReturnType => ({ type: ActionType.SET_ShowType, payload: showType });

const appActions = {
    setIsMobile,
    setCurVal,
    setCalculation,
    setSymbol,
    setFlag,
    setShowType
}

export default appActions