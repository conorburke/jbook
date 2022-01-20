import './code-editor.css';
import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ( {initialValue, onChange}) => {

    const editorRef = useRef<any>();

    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        // console.log(getValue());
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(() => {
            // console.log(getValue());
            onChange(getValue());
        });
    }

    const onFormatClick = () => {
        // get current value from editor
        const currentUnformatted = editorRef.current.getModel().getValue();

        // format value
        const formatted = prettier.format(currentUnformatted, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true,
            tabWidth: 4
        }).replace(/\n$/, '')

        // set formated value back in editor
        editorRef.current.setValue(formatted);
    }
    
    return (
        <div className="editor-wrapper">
            <button onClick={onFormatClick} className="button button-format is-primary is-small">Format</button>
            <MonacoEditor

                editorDidMount={onEditorDidMount}
                // value here really means initial value
                value={initialValue}
                language="javascript" 
                theme="dark" 
                // height="400px"
                height="100%"
                options={{
                    wordWrap: 'on',
                    minimap: { enabled: false},
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true
                }}
            />
        </div>
        );
        
}

export default CodeEditor;