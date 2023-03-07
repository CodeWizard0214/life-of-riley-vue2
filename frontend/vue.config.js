module.exports = {
    chainWebpack: (config) => {
        config
          .plugin('html')
          .tap((args) => {
            args[0].title = 'Experiential Star';
            return args;
          });
    },
    devServer: {
      allowedHosts: [
        'experientialstar.com',
      ],
    },
}