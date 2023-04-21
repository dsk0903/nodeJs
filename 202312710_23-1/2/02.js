const answer = ""
+ "Node.js에서 콜백 핸들러(callback handler)는 비동기 함수의 결과를 처리하기 위해 사용됩니다. "
+ " 콜백 핸들러는 비동기 함수가 실행을 마치면 호출되어 결과를 전달받습니다."
+ "\n콜백지옥은 콜백 함수를 중첩해서 사용하다 보면 코드가 복잡해지고 가독성이 떨어지는 상황을 가리킵니다."
+ "\n콜백지옥을 해결하기 위해서 Promise나 async/await와 같은 기술을 사용합니다."
;
console.log(answer);

// 예제 소스
console.log("---------promises를 활용한 예제---------");

const fs = require('fs').promises;
fs.readFile("./test.txt")
    .then((data) => {
        console.log("1 : ", data.toString());
        return fs.readFile("./test.txt");
    })
    .then((data) => {
        console.log("2 : ", data.toString());
        return fs.readFile("./test.txt");
    })
    .then((data) => {
        console.log("3 : ", data.toString());
        console.log("끝");
    })
    .catch((err) => {
      console.log(err);  
    });