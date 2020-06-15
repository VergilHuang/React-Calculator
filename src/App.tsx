import React, { useState, useEffect } from 'react';
import './App.sass';
import Calculator from './model/components/Calculator';
import $$ from './model/utils/utils';
import Overlay from './model/components/Overlay';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from './model/appRedux/reducers';
import { Dispatch } from 'redux';
import appActions from './model/appRedux/actions';

function App() {

  const isMobile = useSelector<StoreState, boolean>(state => state.isMobile)
  const [isModalShow, setIsModalShow] = useState<boolean>(false);

  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    const isMob = $$.mobileCheck()
    console.log(isMob)
    dispatch(appActions.setIsMobile(isMob))

  }, [dispatch])

  const handleClick = () => {
    setIsModalShow(!isModalShow)
  }

  const overlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    $$.preventDefault(e);
    if (e.target && (e.target as HTMLElement).id === "overlay") {
      setIsModalShow(false);
    }
  }

  //TODO: 需求
  /**
   * - 手機版
   * - 彈出後請取固定在畫面最下方
   * - 寬度為畫面100%，高度最大為畫面50%，計算機modal可scroll
   * 
   * 因為文件裡面明確定義了手機版與電腦版,電腦版需求定義了RWD的規格, 所以本人理解是要透過UserAgent判定裝置類別
   * 此設計要配合story比較能了解實際需求?目前這樣設計本人覺得有點怪,或者是本人理解錯誤?
   */
  const mobileTheme: React.CSSProperties = {
    width: "100vw",
    height: "50vh",
    overflow: "scroll",
    position: "fixed",
    left: 0,
    right: 0,
    top: "50vh",
  }
  return (
    <div id="App">
      <section className="modal-simu">
        <Overlay id="overlay" onClick={overlayClick}>
          <button className={"toggle-btn"} onClick={handleClick}>{isModalShow ? "Close" : "Open"} Calculator</button>
          <Calculator className={isModalShow ? "show" : ""} style={isMobile ? mobileTheme : undefined} />
        </Overlay>
      </section>
    </div>
  );
}

export default App;