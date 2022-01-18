import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../types';

interface CellsState {
    loading: boolean;
    error: | string | null;
    order: string[];
    data: {
        [key: string]: Cell
    }
}

const initialState: CellsState = {
    loading: false,
    error: null,
    order: [],
    data: {}
}

const reducer = produce((state: CellsState = initialState, action: Action): CellsState => {
    switch (action.type) {       
        case ActionType.UPDATE_CELL:
            const { content } = action.payload;
            // with Immer, don't need to do convoluted state updates ourselves
            // just wrap reducer with produce() and call simple statements
            // still return state so typescript knows it won't be undefined
            // return {
            //     ...state,
            //     data: {
            //         ...state.data,
            //         [id]: {...state.data[id], content: content}
            //     }
            // };
            state.data[action.payload.id].content = content;
            return state;
        case ActionType.DELETE_CELL:
            delete state.data[action.payload.id];
            state.order = state.order.filter(i => i !== action.payload.id);
            return state;
        case ActionType.MOVE_CELL:
            const { direction } = action.payload;
            const index = state.order.findIndex(id => id === action.payload.id);
            const targetIndex = direction === 'up' ? index - 1 : index + 1;

            // don't move cell beyond limits 
            if (targetIndex < 0 || targetIndex >= state.order.length) {
                return state;
            }

            state.order[index] = state.order[targetIndex];
            state.order[targetIndex] = action.payload.id;

            return state;
        case ActionType.INSERT_CELL_BEFORE:
            const cell: Cell = {
                id: randomId(),
                content: '',
                type: action.payload.type
            };

            state.data[cell.id] = cell;

            const insertIndex = state.order.findIndex(id => id === action.payload.id);
            if (insertIndex < 0) {
                state.order.push(cell.id);
            } else {
                state.order.splice(insertIndex, 0, cell.id);
            }
            return state;
        default:
            return state;
    }
}, initialState);

const randomId = () => {
    return Math.random().toString(36).substr(2, 5);
}


export default reducer;