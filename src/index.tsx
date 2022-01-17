import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'; 
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/CodeEditor';

const App = () => {
    const ref = useRef<any>();
    const iframe = useRef<any>();
    const [input, setInput] = useState('');
    // const [code, setCode] = useState('');

    useEffect(() => {
        startService();
    }, []);

    const startService = async () => {
        const service = await esbuild.startService({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        })

        ref.current = service;
    }


    const onClick = async () => {
        if (ref.current) {
            // console.log('ref.current', ref.current);
            // console.log(code);

            iframe.current.srcdoc = html;

            // bundling process
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
            
            // don't need this anymore
            // setCode(result.outputFiles[0].text)

            // pass the bundled code as a message to the iframe
            iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');

        }
    }

        // <script>
        //     ${code}
        // </script>
    const html = `
        <html>
            <head></head>
            <body>
                <div id="root"></div>
                <script>
                    window.addEventListener('message', (event) => {
                        console.log(event.data);
                        try {
                            eval(event.data);
                        } catch (err) {
                            const root = document.querySelector('#root');
                            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
                            throw err;
                            console.error(err);
                        }
                        
                    }, false)
                </script>
            </body>
        </html>
    `

    return <div>
        <CodeEditor 
            initialValue="//Happy editing" 
            onChange={(value) => setInput(value)}
        />
        <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
        {/* <pre>{code}</pre> */}
        {/* <iframe title="iframe test" src="/test.html" sandbox="" /> */}
        {/* use srcDoc to load locally instead of making a request with 'src' */}
        {/* sandbox with no 'allow-same-origin' means that direct access is not allowed between iframe */}
        {/* downside with this is we can't use localStorage and some other browser features from iframe */}
        <iframe ref={iframe} srcDoc={html} title="iframe with srcdoc" sandbox="allow-scripts"/>
    </div>;
}

ReactDOM.render(<App />, document.querySelector('#root'));