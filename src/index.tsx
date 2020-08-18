import React from 'react';
import ReactDOM from 'react-dom';
import 'reset-css';
import "./assets/styles/global.sass";
import { Provider } from 'react-redux';
import store from './model/appRedux/store';
import fontawsome from "./model/fontawsome";
import * as serviceWorker from './serviceWorker';
import App from './App';

// init fontawsome
fontawsome()

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();