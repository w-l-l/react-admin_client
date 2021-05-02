const CracoLessPlugin = require('craco-less')
const CracoAlias = require('craco-alias')

module.exports = {
  // 按需加载
  babel: {
    plugins: [
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true
        }
      ]
    ]
  },
  plugins: [
    // 自定义主题
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: { '@primary-color': '#1DA57A' }
          }
        }
      }
    },
    // 配置别名
    {
      plugin: CracoAlias,
      options: {
        baseUrl: './src',
        aliases: {
          '@api': './api',
          '@assets': './assets',
          '@components': './components',
          '@config': './config',
          '@utils': './utils',
        }
      }
    }
  ]
}
