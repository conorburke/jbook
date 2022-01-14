import * as esbuild from 'esbuild-wasm';
 
export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {

            // handle root file of index.js
            build.onResolve({ filter: /(^index\.js$)/}, () => {
                return { path: 'index.js', namespace: 'a'}
            })

            // handle relative paths in a module
            build.onResolve({ filter: /^\.+\//}, (args: any) => {
                return {
                    namespace: 'a',
                    // path: new URL(args.path, args.importer + '/').href
                    path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
                }
            })

            // filter checks the filename inputted
            // namespace can be used to apply onLoad to specified onResolve outputs with a namespace
            // handle root file of module or anything else        
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`
                }
            });
        },
    };
};