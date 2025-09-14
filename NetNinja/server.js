const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    
    const num = _.random(1, 6);
    console.log(num)

    res.setHeader('Content-type', 'text/html');
    let path = './Views/';

    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about')
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break; 
    }

    fs.readFile(path, (error, data) => {
        if(error) {
            console.log(error);
            res.end();
        } else {;
            res.end(data);
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on 3000')
})