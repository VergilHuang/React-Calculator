import React from 'react';
import './App.sass';
import DrawalModal from './model/components/DrawalModal';

function App() {

  const handleClick = () => {
    console.log("click")
  }

  return (
    <div id="App">
      <section>
        <button onClick={handleClick}>Open Calculator</button>
      </section>
      <section className="modal-simu">
        <DrawalModal />
      </section>
    </div>
  );
}

export default App;