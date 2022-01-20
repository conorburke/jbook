import './text-editor.css';
import { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../state/types';
import { useActions } from '../hooks/use-actions';

interface TextEditorProps {
    cell: Cell;
}


const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [editing, setEditing] = useState(false);
    // const [value, setValue] = useState('# Header');
    const { updateCell } = useActions();

    useEffect(() => {
        const listener = (event: MouseEvent) => {

            // don't close editor if clicked, only if outside editor
            if (ref.current && event.target && ref.current.contains(event.target as Node)) {
                console.log('element clicked on is inside editor');
                return;
            }

            setEditing(false);
        };
        document.addEventListener('click', listener, { capture: true });

        return () => {
            document.removeEventListener('click', listener, { capture: true});
        }
    }, []);

    if (editing) {
        return (
            <div ref={ref} className="text-editor">
                {/* <MDEditor value={value} onChange={(v) => setValue(v || '')}/> */}
                {/* <MDEditor value={cell.content} onChange={(v) => setValue(v || '')}/> */}
                <MDEditor value={cell.content} onChange={(v) => updateCell(cell.id, v || '')}/>
            </div>
        );
    }

    return (
        <div onClick={() => setEditing(true)} className="text-editor card">
            <div className="card-content">
                {/* use some default in case no content in cell */}
            <MDEditor.Markdown source={cell.content || 'Click to edit...'} />
            </div>
        </div>
    );
}

export default TextEditor;