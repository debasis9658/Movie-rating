import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';

//curried form of logger function middlware with args as(obj= {dispatch, getState}, next and action)
//Redux internal call ---> logger(obj)(next)(action)
// const logger = function({ dispatch, getState }){
//     return function(next){
//         return function(action){
//             //Middleware code
//             console.log('ACTION_TYPE = ', action.type);
//             next(action);
//         }
//     }
// }


//cleaner way of writing middleware
const logger = ({ dispatch, getState }) => (next) => (action) => {
    if(typeof action !== 'function'){
        console.log('ACTION_TYPE = ', action.type);
    }
    next(action);
}

// const thunk = ({ dispatch, getState }) => (next) => (action) => {
//     if(typeof action === 'function'){
//         action(dispatch);
//         return;
//     }
//     next(action);
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log('Store:', store);
// console.log('BEFORE STATE', store.getState());

// store.dispatch({
//     type: 'ADD_MOVIES',
//     movies: [{name: 'Superman'}]
// });

// console.log('AFTER STATE', store.getState());

ReactDOM.render(<App store={store} />, document.getElementById('root'));
