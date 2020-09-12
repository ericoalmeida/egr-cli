import {GluegunToolbox} from 'gluegun'

module.exports = {
    name: 'generate:component',
    alias: ['c'],
    description: 'Create new component',
    run: async (toolbox: GluegunToolbox) => {
        const {
            parameters,
            filesystem: { read },
            template: {generate},
            print: {success, error}
        } = toolbox;

       if (!parameters.first){
           error('Component name must be specified.');
           return;
       }

       const name = parameters.first;

       const packageList = await read('package.json', 'json');
       const isReactNative = !!packageList.dependencies['react-native'];

       const template = isReactNative ? 'styles-rn.js.ejs' : 'styles-react.js.ejs';

       await generate({
           template: 'component.js.ejs',
           target: `src/components/${name}/index.tsx`,
           props: { name }
       })

       await generate({
           template,
           target: `src/components/${name}/styles.ts`,
        })

        success(`Generated ${name} component.`) 
    } 
}