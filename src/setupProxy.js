const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/pakoman-digital-loan/token',
    createProxyMiddleware({
      target: process.env.REACT_APP_MIDDLEWARE_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/pakoman-digital-loan/token': '/token'
      },
    })
  );

  app.use(
    '/pakoman-digital-loan/mobixCamsCommon/*',
    createProxyMiddleware({
      target: process.env.REACT_APP_MIDDLEWARE_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/pakoman-digital-loan/mobixCamsCommon': '/mobixCamsCommon'
      },
    })
  );

  app.use(
    '/pakoman-digital-loan/mobixCamsClientele/*',
    createProxyMiddleware({
      target: process.env.REACT_APP_MIDDLEWARE_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/pakoman-digital-loan/mobixCamsClientele': '/mobixCamsClientele'
      },
    })
  );

  app.use(
    '/pakoman-digital-loan/mobixCamsCredit',
    createProxyMiddleware({
      target: process.env.REACT_APP_MIDDLEWARE_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/pakoman-digital-loan/mobixCamsCredit': '/mobixCamsCredit'
      },
    })
  );

  app.use(
    '/pakoman-digital-loan/mobixCamsLoan',
    createProxyMiddleware({
      target: process.env.REACT_APP_MIDDLEWARE_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/pakoman-digital-loan/mobixCamsLoan': '/mobixCamsLoan'
      },
    })
  );
  
  app.use(
    '/pakoman-digital-loan/mobixCamsApproval',
    createProxyMiddleware({
      target: process.env.REACT_APP_MIDDLEWARE_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/pakoman-digital-loan/mobixCamsApproval': '/mobixCamsApproval'
      },
    })
  );
  
  app.use(
    '/pakoman-digital-loan/mobixCamsReport',
    createProxyMiddleware({
      target: process.env.REACT_APP_MIDDLEWARE_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/pakoman-digital-loan/mobixCamsReport': '/mobixCamsReport'
      },
    })
  );

  app.use(
    '/pakoman-digital-loan/oauth2/token',
    createProxyMiddleware({
      target: process.env.REACT_APP_IDENTITY_SERVER_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/pakoman-digital-loan/oauth2/token': '/oauth2/token'
      },
    })
  );

  app.use(
    '/pakoman-digital-loan/oauth2/revoke',
    createProxyMiddleware({
      target: process.env.REACT_APP_IDENTITY_SERVER_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/pakoman-digital-loan/oauth2/revoke': '/oauth2/revoke'
      },
    })
  );
};