import './cell-list-item.css';
import { Cell } from '../state/types';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';
import ActionBar from './ActionBar';

interface CellListItemProps {
    cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({cell}) => {
    let child: JSX.Element;

    if (cell.type === 'code') {
        child = (
            <>
                <div className='action-bar-wrapper'>
                    <ActionBar id={cell.id} />
                </div>
                <CodeCell cell={cell} />
            </>
        );
    } else {
        child = (
            <>
                <TextEditor cell={cell} />
                <ActionBar id={cell.id} />
            </>
        );
    }

    return (
        <div className='cell-list-item'>
            {/* putting actionbar after child means that it has priorit rendering, so will be on top. similar to increasing z-index */}
            {child}
            {/* <ActionBar id={cell.id} /> */}
        </div>
    );
}

export default CellListItem;