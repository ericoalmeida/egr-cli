import {GluegunToolbox} from 'gluegun'

module.exports = {
    name: 'generate:component',
    alias: ['c'],
    description: 'Create new component',
    run: async (toolbox: GluegunToolbox) => {
        const {
            parameters,
            createComponent
        } = toolbox;

       const name = parameters.first;

       await createComponent('src/components', name);
    }
}
