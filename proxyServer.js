const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;

require('cors-anywhere').createServer({
    originWhitelist: [],
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, () => {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});
