import React, { FC, useMemo, useRef, useEffect } from 'react';
import "./style.sass"
import CircleButton from '../CircleButton';
import $$ from '../../utils/utils';
import { MathSymbolEnum } from '../../enums';
import RaiusBarButton from '../RadiusBarButton';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../appRedux/reducers';
import appActions from '../../appRedux/actions';
import { Dispatch } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


type Props = React.HTMLAttributes<HTMLDivElement>

const addOrMinus = [MathSymbolEnum.plus, MathSymbolEnum.minus]
const divideOrMultiply = [MathSymbolEnum.divide, MathSymbolEnum.multiply]
// const reverseOrPercent = [MathSymbolEnum.reverse, MathSymbolEnum.percent]

const Calculator: FC<Props> = (props) => {

    const containerRef = useRef<any>()
    const curVal = useSelector<StoreState, string>(state => state.curVal);
    const calculation = useSelector<StoreState, string[]>(state => state.calculation);
    const symbol = useSelector<StoreState, MathSymbolEnum>(state => state.symbol);
    const flag = useSelector<StoreState, boolean>(state => state.flag);
    const showType = useSelector<StoreState, "cur" | "calc">(state => state.showType)

    const dispatch = useDispatch<Dispatch<any>>();

    //數字點擊
    const handleNumClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, numStr: string) => {

        if (symbol === MathSymbolEnum.equal) {
            dispatch(appActions.setCalculation([]))
        }

        let val = curVal;

        const isIncluesDot = val.includes(".");
        if (isIncluesDot && numStr === ".") return

        if (flag) {
            val = "0"
            // 按下數字的時候將運算符號儲存
            if (symbol === MathSymbolEnum.plus)
                dispatch(appActions.setCalculation([...calculation, "+"]))
            if (symbol === MathSymbolEnum.minus)
                dispatch(appActions.setCalculation([...calculation, "-"]))
            if (symbol === MathSymbolEnum.multiply)
                dispatch(appActions.setCalculation([...calculation, "*"]))
            if (symbol === MathSymbolEnum.divide)
                dispatch(appActions.setCalculation([...calculation, "/"]))
        }

        // 容許計算長度為９個數字，包含小數點為１０位
        if ((numStr === "." || isIncluesDot) ? val.length < 11 : val.length < 9) {
            val += numStr
            val = $$.filterZeroHead(val)
        }

        dispatch(appActions.setCurVal(val))
        dispatch(appActions.setShowType("cur"))
        dispatch(appActions.setSymbol(MathSymbolEnum.number));
        dispatch(appActions.setFlag(false));
    }

    // AC
    const cleanResult = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        $$.preventDefault(e)

        dispatch(appActions.setCurVal("0"))
        dispatch(appActions.setCalculation([]))
        dispatch(appActions.setSymbol(MathSymbolEnum.clean))
        dispatch(appActions.setFlag(false))
    }

    // 加減乘除
    const handleCalculate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, ms: MathSymbolEnum) => {
        $$.preventDefault(e)

        if (addOrMinus.includes(ms)) {
            dispatch(appActions.setShowType("calc"))
        }
        else if (divideOrMultiply.includes(ms)) {
            dispatch(appActions.setShowType("cur"))
        }

        if (symbol === MathSymbolEnum.number) {
            dispatch(appActions.setCalculation([...calculation, curVal]))
        }

        dispatch(appActions.setFlag(true));
        dispatch(appActions.setSymbol(ms));
    }

    const hanldeEqual = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        $$.preventDefault(e)

        const metrix = calculation.concat(curVal)
        let result = eval($$.fixEvalString(metrix))
        result = $$.fixNumber(result);

        if (result) {
            dispatch(appActions.setCalculation([result]));
            dispatch(appActions.setCurVal(""));
            dispatch(appActions.setShowType("calc"));
            dispatch(appActions.setFlag(false));
            dispatch(appActions.setSymbol(MathSymbolEnum.equal))
        }
    }

    const answer = useMemo(() => {
        if (showType === "calc") {
            const metrix = calculation
            let result = eval($$.fixEvalString(metrix)) // fixEvalString might be 0, so eval result is undefined.
            result = $$.fixNumber(result || 0)

            return result
        } else {
            return curVal
        }
    }, [showType, curVal, calculation])


    useEffect(() => {
        $$.createDragableElement(containerRef.current)
    }, [])

    return (
        <div ref={containerRef} {...props} className={`calculator-container ${props.className}`}>

            <section className="result-section">
                <span className="result-content" style={{ fontSize: answer.length > 8 ? `calc(3.8rem - ${answer.length * 1.2}px)` : "3.8rem" }}>
                    {answer}
                </span>
                {/* <span className="result-content" style={{ fontSize: curVal.length > 8 ? `calc(3.8rem - ${curVal.length * 1.2}px)` : "3.8rem" }}>
                    {curVal}
                </span> */}
                {/* <span className="result-content" style={{ fontSize: "1rem" }}>
                    {`[${calculation.toString()}]`}
                </span> */}
            </section>
            <div className="calculator-btn-row">
                <CircleButton className="gray-btn-theme" text="AC" onClick={cleanResult} />
                <CircleButton className="gray-btn-theme" text="+/-" onClick={(e) => { alert("not complete yet.") }} />
                <CircleButton className="gray-btn-theme" text="%" onClick={(e) => { alert("not complete yet.") }} />
                <CircleButton className="blue-btn-theme hl" text={<FontAwesomeIcon icon={"divide"} />} onClick={(e) => handleCalculate(e, MathSymbolEnum.divide)} />
            </div>
            <div className="calculator-btn-row">
                <CircleButton className="dark-btn-theme" text="7" onClick={(e) => handleNumClick(e, "7")} />
                <CircleButton className="dark-btn-theme" text="8" onClick={(e) => handleNumClick(e, "8")} />
                <CircleButton className="dark-btn-theme" text="9" onClick={(e) => handleNumClick(e, "9")} />
                <CircleButton className="blue-btn-theme hl" text={<FontAwesomeIcon icon={"times"} />} onClick={(e) => handleCalculate(e, MathSymbolEnum.multiply)} />
            </div>
            <div className="calculator-btn-row">
                <CircleButton className="dark-btn-theme" text="4" onClick={(e) => handleNumClick(e, "4")} />
                <CircleButton className="dark-btn-theme" text="5" onClick={(e) => handleNumClick(e, "5")} />
                <CircleButton className="dark-btn-theme" text="6" onClick={(e) => handleNumClick(e, "6")} />
                <CircleButton className="blue-btn-theme hl" text={<FontAwesomeIcon icon={"minus"} />} onClick={(e) => handleCalculate(e, MathSymbolEnum.minus)} />
            </div>
            <div className="calculator-btn-row">
                <CircleButton className="dark-btn-theme" text="1" onClick={(e) => handleNumClick(e, "1")} />
                <CircleButton className="dark-btn-theme" text="2" onClick={(e) => handleNumClick(e, "2")} />
                <CircleButton className="dark-btn-theme" text="3" onClick={(e) => handleNumClick(e, "3")} />
                <CircleButton className="blue-btn-theme hl" text={<FontAwesomeIcon icon={"plus"} />} onClick={(e) => handleCalculate(e, MathSymbolEnum.plus)} />
            </div>
            <div className="calculator-btn-row">
                <RaiusBarButton className="dark-btn-theme" text="0" onClick={(e) => handleNumClick(e, "0")} />
                <CircleButton className="dark-btn-theme" text="." onClick={(e) => handleNumClick(e, ".")} />
                <CircleButton className="blue-btn-theme" text={<FontAwesomeIcon icon={"equals"} />} onClick={hanldeEqual} />
            </div>
        </div >
    );
};

// 改用redux7版的hook
// export default connect(
//     (store: StoreState) => ({ calcVal: store.calcVal }),
//     (dispatch: Dispatch) => bindActionCreators({ setCalcVal }, dispatch)
// )(Calculator);

export default Calculator