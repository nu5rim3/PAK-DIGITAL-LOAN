var express = require('express')
var path = require('path');
var app = express()
var httpProxy = require('http-proxy')
var cors = require('cors')
var proxy = httpProxy.createProxyServer()

var serverOne = 'https://pomicroapiuat.lolc.lk'

app.use(cors());

app.disable('x-powered-by');

app.use(function (req, res, next) {
    res.setHeader("content-security-policy", "upgrade-insecure-requests; frame-ancestors 'self' http://pofuslbuat01/pakoman-digital-loan");
    res.setHeader("strict-transport-security", "max-age=31536000");
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("x-frame-options", "SAMEORIGIN");
    res.setHeader("x-xss-protection", "1; mode=block");
    return next();
});

app.use(express.static(path.join(__dirname, 'build')));

app.use('/pakoman-digital-loan/robots.txt', function (req, res, next) {
    res.redirect('http://pofuslbuat01/pakoman-digital-loan');
});

app.all("/pakoman-digital-loan/token", function (req, res) {
    var url = req.url;
    url = url.slice(21);
    req.url = url;

    proxy.web(req, res, { target: serverOne, secure: false, changeOrigin: true })
});

app.all("/pakoman-digital-loan/mobixCamsCommon*", function (req, res) {
    var url = req.url;
    url = url.slice(21);
    req.url = url;

    proxy.web(req, res, { target: serverOne, secure: false, changeOrigin: true })
});

app.all("/pakoman-digital-loan/mobixCamsClientele*", function (req, res) {
    var url = req.url;
    url = url.slice(21);
    req.url = url;

    proxy.web(req, res, { target: serverOne, secure: false, changeOrigin: true })
});

app.all("/pakoman-digital-loan/mobixCamsCredit*", function (req, res) {
    var url = req.url;
    url = url.slice(21);
    req.url = url;

    proxy.web(req, res, { target: serverOne, secure: false, changeOrigin: true })
});

app.all("/pakoman-digital-loan/mobixCamsLoan*", function (req, res) {
    var url = req.url;
    url = url.slice(21);
    req.url = url;

    proxy.web(req, res, { target: serverOne, secure: false, changeOrigin: true })
});

app.all("/pakoman-digital-loan/mobixCamsApproval*", function (req, res) {
    var url = req.url;
    url = url.slice(21);
    req.url = url;
    
    proxy.web(req, res, { target: serverOne, secure: false, changeOrigin: true })
});

app.get('/pakoman-digital-loan/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/pakoman-digital-loan/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000);
