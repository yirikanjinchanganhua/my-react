//
import {
    getPackageJSON,
    resolvePackagePath,
    getBaseRollupPlugins
} from './utils';

import generatePackageJSON from 'rollup-plugin-generate-package-json';

const { name, module } = getPackageJSON('react');
// react 包路径
const packagePath = resolvePackagePath(name);
// react 产物路径
const packageDistPath = resolvePackagePath(name, true);
export default [
    // react
    {
        input: `${packagePath}/${module}`,
        output: {
            file: `${packageDistPath}/index.js`,
            format: 'umd',
            name: 'index.js'
        },
        plugins: [
            ...getBaseRollupPlugins(),
            generatePackageJSON({
                inputFolder: packagePath,
                outputFolder: packageDistPath,
                baseContents: ({ name, description, version }) => ({
                    name,
                    description,
                    version,
                    main: 'index.js'
                })
            })
        ]
    },
    // jsx
    {
        input: `${packagePath}/src/jsx.ts`,
        output: [
            // jsx-runtime
            {
                file: `${packageDistPath}/jsx-runtime.js`,
                format: 'umd',
                name: 'jsx-runtime.js'
            },
            // jsx-dev-runtime
            {
                file: `${packageDistPath}/jsx-dev-runtime.js`,
                format: 'umd',
                name: 'jsx.js'
            }
        ],
        plugins: getBaseRollupPlugins()
    }
];
