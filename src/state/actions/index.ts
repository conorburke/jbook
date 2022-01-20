import { ActionType } from '../action-types';
import { CellType, Direction } from '../types';

export interface MoveCellAction {
    type: ActionType.MOVE_CELL;
    payload: {
        id: string;
        direction: Direction
    }
}

export interface DeleteCellAction {
    type: ActionType.DELETE_CELL;
    payload: {
        id: string;
    }
}

export interface InsertCellAfterAction {
    type: ActionType.INSERT_CELL_AFTER;
    payload: {
        // if null then adding to end of order array
        id: string | null;
        type: CellType;
    }
}

export interface UpdateCellAction {
    type: ActionType.UPDATE_CELL;
    payload: {
        id: string;
        content: string;
    }
}

export type Action = 
    | MoveCellAction
    | DeleteCellAction
    | InsertCellAfterAction
    | UpdateCellAction;