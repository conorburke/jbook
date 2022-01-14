import ReactDOM from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'; 
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
    const ref = useRef<any>();
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    useEffect(() => {
        startService();
    }, []);

    const startService = async () => {
        const service = await esbuild.startService({
            worker: true,
            // wasmURL: '/esbuild.wasm'
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        })

        ref.current = service;

        // console.log(service);
    }


    const onClick = async () => {
        console.log(input);

        if (ref.current) {
            console.log('ref.current', ref.current);
            // const result = await ref.current.transform(input, {
            //     loader: 'jsx',
            //     target: 'es2015'
            // });

            const result = await ref.current.build({
                entryPoints: ['index.js'],
                bundle: true,
                write: false,
                plugins: [unpkgPathPlugin(), fetchPlugin(input)],
                // substite values
                define: {
                    'process.env.NODE_ENV': '"production"',
                    global: 'window'
                }
            })

            console.log(result);
            // setCode(result.code);
            setCode(result.outputFiles[0].text)

        }
    }

    return <div>
        <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
        <pre>{code}</pre>
    </div>;
}

ReactDOM.render(<App />, document.querySelector('#root'));