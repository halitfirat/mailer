const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    ['/api', '/auth/google', '/auth/facebook'],
    createProxyMiddleware({
      target: 'http://localhost:8080'
    })
  );
};
