import path from 'path'
/**
 * @type {import('vite').UserConfig}
 */
const config = {
  // ...import
  publicDir: 'src/assets',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}
export default config
