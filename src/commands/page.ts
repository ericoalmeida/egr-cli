import {GluegunToolbox} from 'gluegun'

module.exports = {
    name: 'generate:page',
    alias: ['p'],
    description: 'Create new page',
    run: async (toolbox: GluegunToolbox) => {
        const {
            parameters,
            createComponent
        } = toolbox;

       const name = parameters.first;

       await createComponent('src/pages', name);
    }
}
