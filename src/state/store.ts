import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { ActionType } from './action-types';


export const store = createStore(reducers, {}, applyMiddleware(thunk));






// manually test the redux store


store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'code'
    }
});

store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'code'
    }
});

store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'text'
    }
});

// store.dispatch({
//     type: ActionType.INSERT_CELL_AFTER,
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