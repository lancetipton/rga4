import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import sucrase from '@rollup/plugin-sucrase'
import { terser } from 'rollup-plugin-terser'

const isProd = process.env.NODE_ENV === 'production'

// Need to require our babel.config.js because it uses module.exports
const babelConfig = require('./babel.config.js')

export default {
  external: ['react'],
  watch: {
    clearScreen: false,
  },
  input: `./index.js`,
  output: [
    {
      file: `build/rga4.js`,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: `build/rga4.esm.js`,
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({}),
    babel({
      babelrc: false,
      sourceMaps: true,
      inputSourceMap: true,
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      ...babelConfig,
    }),
    commonjs(),
    sucrase({
      transforms: ['jsx', 'flow'],
    }),
    isProd &&
      terser({
        mangle: {
          keep_fnames: true,
          keep_classnames: true,
        },
      }),
    cleanup(),
  ],
}
