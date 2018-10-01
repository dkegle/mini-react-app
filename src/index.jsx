import ReactDOM from 'react-dom';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import App from './components/app.jsx';
import rootReducer from './reducers/root.jsx';

import './css/style.scss';

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('react-app'));