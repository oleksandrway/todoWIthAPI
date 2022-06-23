import path from 'path'
/**
 * @type {import('vite').UserConfig}
 */
const config = {
  // ...import
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}
export default config
