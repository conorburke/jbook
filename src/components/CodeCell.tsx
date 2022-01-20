import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import BundlerService from '../bundler';
import Resizable from './Resizable';
import { Cell } from '../state/types';
import { useActions } from '../hooks/use-actions';

interface CodeCellProps {
    cell: Cell
}

// destructe 'cell' from props.cell
const CodeCell: React.FC<CodeCellProps> = ({ cell } ) => {
    // extracted this local state to redux
    // const [input, setInput] = useState('');
    const { updateCell } = useActions();
    const [code, setCode] = useState('');
    const [err, setErr] = useState('');

    // const onClick = async () => {
    //     const output = await BundlerService(input);
    //     setCode(output);
    // }

    useEffect(() => {
        const timer = setTimeout(async () => {
            // const output = await BundlerService(input);
            const output = await BundlerService(cell.content);
            setCode(output.code);
            setErr(output.err);
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
    // }, [input]);
    }, [cell.content]);
        

    return (
        <Resizable direction='vertical'>
            <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
                <Resizable direction='horizontal'>
                    <CodeEditor 
                        // initialValue='//Happy editing' 
                        initialValue={cell.content} 
                        // onChange={(value) => setInput(value)}
                        onChange={(value) => updateCell(cell.id, value)}
                    />
                </Resizable>
                
                {/* <textarea value={input} onChange={e => setInput(e.target.value)}></textarea> */}
                {/* <div>
                    <button onClick={onClick}>Submit</button>
                </div> */}
                {/* <pre>{code}</pre> */}
                {/* <iframe title="iframe test" src="/test.html" sandbox="" /> */}
                {/* use srcDoc to load locally instead of making a request with 'src' */}
                {/* sandbox with no 'allow-same-origin' means that direct access is not allowed between iframe */}
                {/* downside with this is we can't use localStorage and some other browser features from iframe */}
                <Preview code={code} bundleError={err} />
            </div>
        </Resizable>
    );
}

export default CodeCell;