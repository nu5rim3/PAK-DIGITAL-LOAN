const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/pakoman-digital-loan/token',
    createProxyMiddleware({
      target: 'https://pomicroapiuat.lolc.lk',
      changeOrigin: true,
    })
  );

  app.use(
    '/pakoman-digital-loan/mobixCamsCommon',
    createProxyMiddleware({
      target: 'https://pomicroapiuat.lolc.lk',
      changeOrigin: true,
    })
  );

  app.use(
    '/pakoman-digital-loan/mobixCamsClientele',
    createProxyMiddleware({
      target: 'https://pomicroapiuat.lolc.lk',
      changeOrigin: true,
    })
  );

  app.use(
    '/pakoman-digital-loan/mobixCamsCredit',
    createProxyMiddleware({
      target: 'https://pomicroapiuat.lolc.lk',
      changeOrigin: true,
    })
  );

  app.use(
    '/pakoman-digital-loan/mobixCamsLoan',
    createProxyMiddleware({
      target: 'https://pomicroapiuat.lolc.lk',
      changeOrigin: true,
    })
  );

  app.use(
    '/pakoman-digital-loan/mobixCamsApproval',
    createProxyMiddleware({
      target: 'https://pomicroapiuat.lolc.lk',
      changeOrigin: true,
    })
  );
};