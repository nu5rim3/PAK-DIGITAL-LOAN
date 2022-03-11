const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/token',
    createProxyMiddleware({
      target: 'https://pomicroapiuat.lolc.lk',
      changeOrigin: true,
    })
  );

  app.use(
    '/mobixCamsCommon',
    createProxyMiddleware({
      target: 'https://pomicroapiuat.lolc.lk',
      changeOrigin: true,
    })
  );

  app.use(
    '/mobixCamsClientele',
    createProxyMiddleware({
      target: 'https://pomicroapiuat.lolc.lk',
      changeOrigin: true,
    })
  );

  app.use(
    '/mobixCamsCredit',
    createProxyMiddleware({
      target: 'https://pomicroapiuat.lolc.lk',
      changeOrigin: true,
    })
  );

  app.use(
    '/mobixCamsLoan',
    createProxyMiddleware({
      target: 'https://pomicroapiuat.lolc.lk',
      changeOrigin: true,
    })
  );

  app.use(
    '/mobixCamsApproval',
    createProxyMiddleware({
      target: 'https://pomicroapiuat.lolc.lk',
      changeOrigin: true,
    })
  );

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8086',
      changeOrigin: true,
    })
  );
};