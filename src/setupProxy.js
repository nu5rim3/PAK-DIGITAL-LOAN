const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/token',
    createProxyMiddleware({
      target: 'https://pofuslbuat01:8243',
      changeOrigin: true,
    })
  );

  app.use(
    '/mobixCamsCommon',
    createProxyMiddleware({
      target: 'https://pofuslbuat01:8243',
      changeOrigin: true,
    })
  );

  app.use(
    '/mobixCamsClientele',
    createProxyMiddleware({
      target: 'https://pofuslbuat01:8243',
      changeOrigin: true,
    })
  );

  app.use(
    '/mobixCamsCredit',
    createProxyMiddleware({
      target: 'https://pofuslbuat01:8243',
      changeOrigin: true,
    })
  );

  app.use(
    '/mobixCamsLoan',
    createProxyMiddleware({
      target: 'https://pofuslbuat01:8243',
      changeOrigin: true,
    })
  );

  app.use(
    '/mobixCamsApproval',
    createProxyMiddleware({
      target: 'https://pofuslbuat01:8243',
      changeOrigin: true,
    })
  );
};