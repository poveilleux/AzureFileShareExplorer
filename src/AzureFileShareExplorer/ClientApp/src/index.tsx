import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'src/index.scss';
import App from 'src/App';
import * as serviceWorker from 'src/serviceWorker';

const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
    rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
