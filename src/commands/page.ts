import {GluegunToolbox} from 'gluegun'

module.exports = {
    name: 'generate:page',
    alias: ['p'],
    description: 'Create new page',
    run: async (toolbox: GluegunToolbox) => {
        const {
            parameters,
            filesystem: { read },
            template: {generate},
            print: {success, error}
        } = toolbox;

       if (!parameters.first){
           error('Page name must be specified.');
           return;
       }

       const name = parameters.first;

       const packageList = await read('package.json', 'json');
       const isReactNative = !!packageList.dependencies['react-native'];

       const template = isReactNative ? 'styles-rn.js.ejs' : 'styles-react.js.ejs';

       await generate({
           template: 'page.js.ejs',
           target: `src/pages/${name}/index.tsx`,
           props: { name }
       })

       await generate({
           template,
           target: `src/pages/${name}/styles.ts`,
        })

        success(`Generated ${name} page.`) 
    } 
}