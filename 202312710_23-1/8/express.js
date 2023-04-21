const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
  try {
    if (req.url === '/') {
        const data = await fs.readFile('./root.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      } else if (req.url === '/login') {
        const data = await fs.readFile('./login.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      } else if (req.url === '/user') {
        const data = await fs.readFile('./user.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      }
  } catch (err) {
    console.error(err);
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(err.message);
  }
})
  .listen(8080, () => {
    console.log('8080번 포트에서 서버 대기 중입니다!');
  });
