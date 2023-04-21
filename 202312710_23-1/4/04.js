/*
const answer = "실행결과는 \'http://localhost:3000\' 로 가서 확인할 수 있습니다."
+ "\n실행결과로 \'Hello World\'라는 문자열이 출력됩니다."
;
console.log(answer);
*/
const http = require("http");
const fs = require("fs").promises;

http.createServer(async (request, response) => {
    try {
        const data = await fs.readFile("./04.html");
        response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
        response.end(data);
    } catch(err) {
        console.error(err);
        response.writeHead(500, {"Content-Type":"text/html; charset=utf-8"});
        response.end(err.message);
    }
}).listen(3000, () => {
    console.log("3000번 포트에서 서버 대기 중")
});