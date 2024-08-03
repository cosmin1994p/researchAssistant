const https = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('/home/cosmin/researchAssistant/research-assistant-UI/selfsigned.key'),
  cert: fs.readFileSync('/etc/ssl/certs/nginx-selfsigned.crt')

};

const port = 3000;
const hostname = '192.168.4.120';

app.prepare().then(() => {
  https.createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Ready on https:${hostname}  ${port}`);
  });
}); 
