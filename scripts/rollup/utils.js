import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';

const packagePath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');
function resolvePackagePath(packageName, isDist) {
    if (isDist) {
        return `${distPath}/${packageName}`;
    } else {
        return `${packagePath}/${packageName}`;
    }
}
function getPackageJSON(packageName) {
    // 包的路径
    const path = `${resolvePackagePath(packageName)}/package.json`;
    const str = fs.readFileSync(path, { encoding: 'utf-8' });
    return JSON.parse(str);
}

function getBaseRollupPlugins({ typescript = {} } = {}) {
    return [cjs(), ts(typescript)];
}

export { resolvePackagePath, getPackageJSON, getBaseRollupPlugins };
