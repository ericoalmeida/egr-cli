import { GluegunToolbox } from 'gluegun';

module.exports = (toolbox: GluegunToolbox) => {
    const {
        filesystem: { read },
        print: { success, error },
        template: { generate }
    } = toolbox;

    async function isReactNative() {
        const packageList = await read('package.json', 'json');

        return !!packageList.dependencies['react-native'];
    }

    async function createComponent(folder: String, name: String) {
        if (!folder) {
            error('Folder must be specified.');
            return;
        }

        if (!name) {
            error('Name must be specified.');
            return;
        }

        await generate({
            template: 'component.js.ejs',
            target: `${folder}/${name}/index.tsx`,
            props: { name }
        });

        const template = (await isReactNative())
            ? 'styles-rn.js.ejs'
            : 'styles-react.js.ejs';

        await generate({
            template,
            target: `${folder}/${name}/styles.ts`
        });

        success(`Generated ${folder}/${name}.`);
    }

    toolbox.createComponent = createComponent;
};
