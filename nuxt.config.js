const path = require("path");
function resolve(dirname, dir) {
  return path.join(dirname, "./", dir);
}

module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      { src: '/rem/flexible.js', type: 'text/javascript', charset: 'utf-8' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@/plugins/vant", "@/plugins/icons"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/proxy"],
  axios: {
    proxy: true, // 表示开启代理
    prefix: '/', // 表示给请求url加个前缀 /api
    credentials: false, // 表示跨域请求时是否需要使用凭证
  },
  proxy: {
    '/api': {
      // 需要代理的接口host
      target: 'http://rheumatism.medsci.cn',
      pathRewrite: {
        '^/api': '/'
      }
    },
    '/cf': {
      // 需要代理的接口host
      target: 'http://out.s.medsci.cn',
      pathRewrite: {
        '^/cf': '/cf'
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      const svgRule = config.module.rules.find(rule => rule.test.test(".svg"));
      svgRule.exclude = [resolve(__dirname, "assets/icons/svg")];
      // Includes /assets/icons/svg for svg-sprite-loader
      config.module.rules.push({
        test: /\.svg$/,
        include: [resolve(__dirname, "assets/icons/svg")],
        loader: "svg-sprite-loader",
        options: {
          symbolId: "icon-[name]"
        }
      });
    },
    postcss: [
      require('postcss-px2rem')({
        remUnit: 75
      })
    ]
  },

  server: {
    host: '0.0.0.0',
    port: 8888
  },

  router: {
    base: '/',
    middleware: ['userAuth']
  }
};
