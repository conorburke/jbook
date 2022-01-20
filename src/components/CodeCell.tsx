import'./code-cell.css';
import { useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';
import { Cell } from '../state/types';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

interface CodeCellProps {
    cell: Cell
}

// destructe 'cell' from props.cell
const CodeCell: React.FC<CodeCellProps> = ({ cell } ) => {
    // extracted this local state to redux
    // const [input, setInput] = useState('');
    const { updateCell, createBundle } = useActions();
    // const [code, setCode] = useState('');
    // const [err, setErr] = useState('');
    
    const bundle = useTypedSelector((state) => state.bundles[cell.id]);
    // console.log(bundle);

    // const onClick = async () => {
    //     const output = await BundlerService(input);
    //     setCode(output);
    // }

    useEffect(() => {

        if (!bundle) {
            createBundle(cell.id, cell.content);
            return;
        }

        const timer = setTimeout(async () => {
            // const output = await BundlerService(input);
            // const output = await BundlerService(cell.content);
            // setCode(output.code);
            // setErr(output.err);
            createBundle(cell.id, cell.content);
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
    // }, [input]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cell.content, cell.id, createBundle]);
        

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
                <div className='progress-wrapper'>
                    { !bundle || bundle.loading 
                    ?   
                        <div className='progress-cover'>
                            <progress className='progress is-small is-primary' max='100'>
                                Loading
                            </progress>
                        </div> 
                        
                    : <Preview code={bundle.code} bundleError={bundle.err} />}
                </div>
            </div>
        </Resizable>
    );
}

export default CodeCell;