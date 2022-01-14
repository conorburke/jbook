import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
    name: 'fc'
});

export const fetchPlugin = (input: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
        build.onLoad({ filter: /(^index\.js$)/}, () => {
            return {
                loader: 'jsx',
                contents: input
            };
        });

        build.onLoad( { filter: /.*/}, async (args: any) => {
            const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

            if (cachedResult) {
                return cachedResult;
            }
            console.log('called empty onload');
            // returning null tells onLoad to check other loaders that match filter
            return null;
        });

        build.onLoad({ filter: /.css$/ }, async (args: any) => {
            // don't need here because taken care of in catch all loader
            // const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

            // if (cachedResult) {
            //     return cachedResult;
            // }

            const { data, request } = await axios.get(args.path);
            // make sure css files don't break the quotes
            const escaped = data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");
            const contents = 
                `const style = document.createElement('style');
                style.innerText = '${escaped}';
                document.head.appendChild(style);`;
            
            console.log(contents);

            const result: esbuild.OnLoadResult = {
                loader: 'jsx',
                // contents: data,
                contents: contents,
                resolveDir: new URL('./', request.responseURL).pathname
            }

            await fileCache.setItem(args.path, result);

            return result;
        })

        build.onLoad({ filter: /.*/ }, async (args: any) => {
            // console.log('onLoad', args);
            // if (args.path === 'index.js') {
            //     return {
            //         loader: 'jsx',
            //         contents: input
            //         // contents: `
            //         // // import message from './message';
            //         // // import message from 'nested-test-pkg';
            //         // // console.log(message);
            //         // import React from 'react';
            //         // console.log(React);
            //         // `,
            //     };
            // } 

            // don't need here because taken care of in catch all loader
            // const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

            // if (cachedResult) {
            //     return cachedResult;
            // }

            const { data, request } = await axios.get(args.path);
 

            const result: esbuild.OnLoadResult = {
                loader: 'jsx',
                // contents: data,
                contents: data,
                resolveDir: new URL('./', request.responseURL).pathname
            }

            await fileCache.setItem(args.path, result);

            return result;

            // } else {
            //     return {
            //         loader: 'jsx',
            //         contents: 'export default "hi there!"',
            //     };
            // }
        });
        }
    }
}