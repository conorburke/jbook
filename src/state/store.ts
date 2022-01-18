import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';


export const store = createStore(reducers, {}, applyMiddleware(thunk));






// manually test the redux store

// import { ActionType } from './action-types';
// store.dispatch({
//     type: ActionType.INSERT_CELL_BEFORE,
//     payload: {
//         id: null,
//         type: 'code'
//     }
// });

// store.dispatch({
//     type: ActionType.INSERT_CELL_BEFORE,
//     payload: {
//         id: 'def',
//         type: 'code'
//     }
// });

// store.dispatch({
//     type: ActionType.INSERT_CELL_BEFORE,
//     payload: {
//         id: 'abc',
//         type: 'text'
//     }
// });

// store.dispatch({
//     type: ActionType.INSERT_CELL_BEFORE,
//     payload: {
//         id: null,
//         type: 'text'
//     }
// });

// console.log(store.getState());

// const id = store.getState().cells.order[0];
// store.dispatch({
//     type: ActionType.DELETE_CELL,
//     payload: {
//         id: id
//     }
// });


// console.log(store.getState());