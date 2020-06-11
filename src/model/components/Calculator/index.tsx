import React, { FC, useState, useMemo } from 'react';
import "./style.sass"
import CircleButton from '../CircleButton';
import $$ from '../../utils/utils';
import { connect } from 'react-redux';
import { StoreState } from '../../appRedux/reducers';
import { bindActionCreators, Dispatch } from 'redux';
import { setCalcVal } from '../../appRedux/actions';
import { MathSymbolEnum } from '../../enums';
import RaiusBarButton from '../RadiusBarButton';
type Props = {
    calcVal: string;
    setCalcVal: typeof setCalcVal;
}

const signGroup1 = [MathSymbolEnum.plus, MathSymbolEnum.minus, MathSymbolEnum.divide, MathSymbolEnum.multiply, MathSymbolEnum.reverse, MathSymbolEnum.percent]

const Calculator: FC<Props> = (props) => {

    const [curVal, setCurVal] = useState<string>("0");
    const [isSignedSymbol, setIsSignedSymbol] = useState(false);   //　若true則下次的number按鈕按下時複寫curVal
    const [symbol, setSymbol] = useState<MathSymbolEnum>(MathSymbolEnum.none) // 按下按鈕的類型
    const grayBtnTheme = { bgColor: "#AFAFAF", textColor: "#333" }
    const blueBtnTheme = { bgColor: "#3091FD", textColor: "#fff" }
    const darkBtnTheme = { bgColor: "#333", textColor: "#fff" }

    //數字點擊
    const handleNumClick = (numStr: string) => {

        let _val = isSignedSymbol ? "0" : curVal
        const isIncluesDot = _val.includes(".");

        if (_val === "0" && numStr === "0") return
        if (isIncluesDot && numStr === ".") return

        // 容許長度為９個數字，包含小數點為１０位
        if (isIncluesDot ? _val.length < 10 : _val.length < 9) {
            _val += numStr
            _val = $$.filterZeroHead(_val)
        }

        setCurVal(_val)
        setIsSignedSymbol(false);
    }

    // AC
    const cleanResult = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        setCurVal("0")
        props.setCalcVal("0")

        takeSign(MathSymbolEnum.clean)
    }

    // 正負反轉
    const handleReverseSign = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (isSignedSymbol) {
            props.setCalcVal($$.reverseSign(props.calcVal))
        } else {
            setCurVal($$.reverseSign(curVal))
        }

        takeSign(MathSymbolEnum.reverse)
        // setSymbol(MathSymbolEnum.reverse)
    }

    // 加減乘除
    const handleCalculate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, ms: MathSymbolEnum) => {
        e.preventDefault()

        if (symbol !== MathSymbolEnum.equal) {
            if (signGroup1.includes(symbol)) {
                //連續加減乘除的情況，會一直求值
                doCalculate()
            }
            else {
                props.setCalcVal(curVal);
            }
        }

        takeSign(ms)
    }

    //　計算
    const doCalculate = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e?.preventDefault()

        let result = curVal;
        if (symbol === MathSymbolEnum.plus) {
            result = $$.add(+props.calcVal, +curVal).toString()
        }
        else if (symbol === MathSymbolEnum.minus) {
            result = $$.minus(+props.calcVal, +curVal).toString()
        }
        else if (symbol === MathSymbolEnum.divide) {
            result = $$.divide(+props.calcVal, +curVal).toString()
        }
        else if (symbol === MathSymbolEnum.multiply) {
            result = $$.multiply(+props.calcVal, +curVal).toString()
        }
        else {
            result = props.calcVal;
        }

        if (result === "Infinity") return

        props.setCalcVal(result)

        takeSign(MathSymbolEnum.equal)
    }

    const takeSign = (s: MathSymbolEnum, ) => {
        setSymbol(s)
        setIsSignedSymbol(true);
    }

    const showNumStr = useMemo(() => {
        return isSignedSymbol ? props.calcVal : curVal
    }, [isSignedSymbol, props.calcVal, curVal])

    return (
        <div className="calculator-container">
            <section className="result-section">
                <span className="result-content" style={{ fontSize: showNumStr.length > 8 ? `calc(3.8rem - ${showNumStr.length * 1.2}px)` : "3.8rem" }}>
                    {showNumStr}
                </span>
            </section>
            <div className="calculator-btn-row">
                <CircleButton text="AC" backgroundColor={grayBtnTheme.bgColor} textColor={grayBtnTheme.textColor} onClick={cleanResult} />
                <CircleButton text="+/-" backgroundColor={grayBtnTheme.bgColor} textColor={grayBtnTheme.textColor} onClick={handleReverseSign} />
                <CircleButton text="%" backgroundColor={grayBtnTheme.bgColor} textColor={grayBtnTheme.textColor} onClick={() => { }} />
                <CircleButton text="÷" backgroundColor={blueBtnTheme.bgColor} textColor={blueBtnTheme.textColor} onClick={(e) => handleCalculate(e, MathSymbolEnum.divide)} />
            </div>
            <div className="calculator-btn-row">
                <CircleButton text="7" backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={() => handleNumClick("7")} />
                <CircleButton text="8" backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={() => handleNumClick("8")} />
                <CircleButton text="9" backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={() => handleNumClick("9")} />
                <CircleButton text="X" backgroundColor={blueBtnTheme.bgColor} textColor={blueBtnTheme.textColor} onClick={(e) => handleCalculate(e, MathSymbolEnum.multiply)} />
            </div>
            <div className="calculator-btn-row">
                <CircleButton text="4" backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={() => handleNumClick("4")} />
                <CircleButton text="5" backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={() => handleNumClick("5")} />
                <CircleButton text="6" backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={() => handleNumClick("6")} />
                <CircleButton text="-" backgroundColor={blueBtnTheme.bgColor} textColor={blueBtnTheme.textColor} onClick={(e) => handleCalculate(e, MathSymbolEnum.minus)} />
            </div>
            <div className="calculator-btn-row">
                <CircleButton text="1" backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={() => handleNumClick("1")} />
                <CircleButton text="2" backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={() => handleNumClick("2")} />
                <CircleButton text="3" backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={() => handleNumClick("3")} />
                <CircleButton text="+" backgroundColor={blueBtnTheme.bgColor} textColor={blueBtnTheme.textColor} onClick={(e) => handleCalculate(e, MathSymbolEnum.plus)} />
            </div>
            <div className="calculator-btn-row">
                <RaiusBarButton text="0" backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={() => handleNumClick("0")} />
                <CircleButton text="." backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={() => handleNumClick(".")} />
                <CircleButton text="=" backgroundColor={blueBtnTheme.bgColor} textColor={blueBtnTheme.textColor} onClick={doCalculate} />
            </div>
        </div>
    );
};

export default connect(
    (store: StoreState) => ({ calcVal: store.calcVal }),
    (dispatch: Dispatch) => bindActionCreators({ setCalcVal }, dispatch)
)(Calculator);