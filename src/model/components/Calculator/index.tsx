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
    // calcVal: string;
    // setCalcVal: typeof setCalcVal;
}

const addOrMinus = [MathSymbolEnum.plus, MathSymbolEnum.minus]
const divideOrMultiply = [MathSymbolEnum.divide, MathSymbolEnum.multiply]
const reverseOrPercent = [MathSymbolEnum.reverse, MathSymbolEnum.percent]

const Calculator: FC<Props> = (props) => {

    const [curVal, setCurVal] = useState<string>("0");
    const [calculation, setCalculation] = useState<string[]>([]);
    const [symbol, setSymbol] = useState<MathSymbolEnum>(MathSymbolEnum.none);
    const [flag, setFlag] = useState(false);
    const [showType, setShowType] = useState<"calc" | "cur">("cur")
    const grayBtnTheme = { bgColor: "#AFAFAF", textColor: "#333" }
    const blueBtnTheme = { bgColor: "#3091FD", textColor: "#fff" }
    const darkBtnTheme = { bgColor: "#333", textColor: "#fff" }

    //數字點擊
    const handleNumClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, numStr: string) => {

        if (symbol === MathSymbolEnum.equal) {
            setCalculation([])
        }

        let val = curVal;

        const isIncluesDot = val.includes(".");
        if (isIncluesDot && numStr === ".") return

        if (flag) {
            val = "0"
            // 按下數字的時候將運算符號儲存
            if (symbol === MathSymbolEnum.plus)
                setCalculation([...calculation, "+"])
            if (symbol === MathSymbolEnum.minus)
                setCalculation([...calculation, "-"])
            if (symbol === MathSymbolEnum.multiply)
                setCalculation([...calculation, "*"])
            if (symbol === MathSymbolEnum.divide)
                setCalculation([...calculation, "/"])
        }



        // 容許長度為９個數字，包含小數點為１０位
        if (isIncluesDot ? val.length < 10 : val.length < 9) {
            val += numStr
            val = $$.filterZeroHead(val)
        }

        setCurVal(val)
        setShowType("cur")
        setSymbol(MathSymbolEnum.number);
        setFlag(false);
    }

    // AC
    const cleanResult = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        setCurVal("0")
        setCalculation([])
        setSymbol(MathSymbolEnum.clean)
        setFlag(false);
    }

    const handleReverse = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        // if ()
        setSymbol(MathSymbolEnum.reverse)
        setFlag(false);
    }

    // 加減乘除
    const handleCalculate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, ms: MathSymbolEnum) => {
        e.preventDefault()

        if (addOrMinus.includes(ms)) {
            setShowType("calc")
        }
        else if (divideOrMultiply.includes(ms)) {
            setShowType("cur")
        }

        if (symbol === MathSymbolEnum.number) {
            setCalculation([...calculation, curVal])
        }

        setFlag(true);
        setSymbol(ms);
    }

    const hanldeEqual = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()



        const result = eval(calculation.concat(curVal).join(""));
        if (result) {
            setCalculation([result]);
            setCurVal("");
            setShowType("calc");
            setFlag(false);
            setSymbol(MathSymbolEnum.equal)
        }
    }

    const answer = useMemo(() => {
        if (showType === "calc") {

            return eval(calculation.join("")) || "0"
        } else {
            return curVal
        }
    }, [showType, curVal, calculation])

    return (
        <div className="calculator-container">
            <section className="result-section">

                <span className="result-content" style={{ fontSize: answer.length > 8 ? `calc(3.8rem - ${answer.length * 1.2}px)` : "3.8rem" }}>
                    {answer}
                </span>

                <span className="result-content" style={{ fontSize: curVal.length > 8 ? `calc(3.8rem - ${curVal.length * 1.2}px)` : "3.8rem" }}>
                    {curVal}
                </span>
                <span className="result-content" style={{ fontSize: "1rem" }}>
                    {`[${calculation.toString()}]`}
                </span>
            </section>
            <div className="calculator-btn-row">
                <CircleButton text="AC" backgroundColor={grayBtnTheme.bgColor} textColor={grayBtnTheme.textColor} onClick={cleanResult} />
                <CircleButton text="+/-" backgroundColor={grayBtnTheme.bgColor} textColor={grayBtnTheme.textColor} onClick={(e) => handleCalculate(e, MathSymbolEnum.reverse)} />
                <CircleButton text="%" backgroundColor={grayBtnTheme.bgColor} textColor={grayBtnTheme.textColor} onClick={() => { }} />
                <CircleButton text="÷" backgroundColor={blueBtnTheme.bgColor} textColor={blueBtnTheme.textColor} onClick={(e) => handleCalculate(e, MathSymbolEnum.divide)} />
            </div>
            <div className="calculator-btn-row">
                <CircleButton text="7" backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={(e) => handleNumClick(e, "7")} />
                <CircleButton text="8" backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={(e) => handleNumClick(e, "8")} />
                <CircleButton text="9" backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={(e) => handleNumClick(e, "9")} />
                <CircleButton text="X" backgroundColor={blueBtnTheme.bgColor} textColor={blueBtnTheme.textColor} onClick={(e) => handleCalculate(e, MathSymbolEnum.multiply)} />
            </div>
            <div className="calculator-btn-row">
                <CircleButton text="4" backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={(e) => handleNumClick(e, "4")} />
                <CircleButton text="5" backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={(e) => handleNumClick(e, "5")} />
                <CircleButton text="6" backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={(e) => handleNumClick(e, "6")} />
                <CircleButton text="-" backgroundColor={blueBtnTheme.bgColor} textColor={blueBtnTheme.textColor} onClick={(e) => handleCalculate(e, MathSymbolEnum.minus)} />
            </div>
            <div className="calculator-btn-row">
                <CircleButton text="1" backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={(e) => handleNumClick(e, "1")} />
                <CircleButton text="2" backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={(e) => handleNumClick(e, "2")} />
                <CircleButton text="3" backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={(e) => handleNumClick(e, "3")} />
                <CircleButton text="+" backgroundColor={blueBtnTheme.bgColor} textColor={blueBtnTheme.textColor} onClick={(e) => handleCalculate(e, MathSymbolEnum.plus)} />
            </div>
            <div className="calculator-btn-row">
                <RaiusBarButton text="0" backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={(e) => handleNumClick(e, "0")} />
                <CircleButton text="." backgroundColor={darkBtnTheme.bgColor} textColor={darkBtnTheme.textColor} onClick={(e) => handleNumClick(e, ".")} />
                <CircleButton text="=" backgroundColor={blueBtnTheme.bgColor} textColor={blueBtnTheme.textColor} onClick={hanldeEqual} />
            </div>
        </div>
    );
};

export default connect(
    (store: StoreState) => ({ calcVal: store.calcVal }),
    (dispatch: Dispatch) => bindActionCreators({ setCalcVal }, dispatch)
)(Calculator);