import './preview.css';
import { useEffect, useRef } from 'react';


interface PreviewProps {
    code: string;
    bundleError: string;
}

const html = `
        <html>
            <head>
                <style>html { background-color: white; }</style>
            </head>
            <body>
                <div id="root"></div>
                <script>
                    const handleError = (err) => {
                        const root = document.querySelector('#root');
                        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
                        throw err;
                        console.error(err);
                    }

                    window.addEventListener('error', (event) => {
                        console.log(event);
                        event.preventDefault();
                        handleError(event.error);
                    })

                    window.addEventListener('message', (event) => {
                        // console.log(event.data);
                        try {
                            eval(event.data);
                        } catch (err) {
                            handleError(err);
                        }
                        
                    }, false)
                </script>
            </body>
        </html>
    `

const Preview: React.FC<PreviewProps> = ({code, bundleError }) => {
    const iframe = useRef<any>();

    useEffect(() => {
        // TODO figure out why this blanks out preview area
        // iframe.current.srcdoc = html;
        // pass the bundled code as a message to the iframe
        // quick timeout to make sure old renders don't flash in preview screen
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, '*');
        }, 100);
    }, [code]);

    return (
        <div className="preview-wrapper">
            <iframe 
                ref={iframe} 
                srcDoc={html} 
                title="iframe with srcdoc" 
                sandbox="allow-scripts"
            />
            {bundleError && <div className="preview-error">{bundleError}</div>}
        </div>
    )
};

export default Preview;