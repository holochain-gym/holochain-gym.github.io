import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

const pkg = require('./package.json');

export default {
  input: './src/index.ts',
  output: {
    dir: './dist',
    format: 'es',
    sourcemap: true,
  },
  external: [...Object.keys(pkg.dependencies).filter(key => key !== 'blakejs')],
  plugins: [
    typescript(),
    resolve(),
    commonjs({ include: ['node_modules/blakejs/**/*'] }),
  ],
};
