#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');

let rl;
let type = process.argv[2];
let name = process.argv[3];
let directory = process.argv[4] || '.';

const htmlTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Template</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>CLI</p>
  </body>
</html>
`;

const routerTemplate = `
const express = require('express');
const router = express.Router();
 
router.get('/', (req, res, next) => {
   try {
     res.send('ok');
   } catch (error) {
     console.error(error);
     next(error);
   }
});
 
module.exports = router;
`;

const gugudanGame = () => {
  const number1 = Math.floor(Math.random() * 9) + 1;
  const number2 = Math.floor(Math.random() * 9) + 1;
  const answer = number1 * number2;

  rl.question(`${number1} x ${number2} = ? `, (userAnswer) => {
    if (parseInt(userAnswer) === answer) {
      console.log('정답입니다!');
      rl.close();
    } else {
      console.log('오답입니다.');
      gugudanGame();
    }
  });
};

const calculator = () => {
  rl.question('계산할 연산식을 입력하세요 (예: 2 + 3): ', (expression) => {
    const [num1, operator, num2] = expression.split(' ');

    let result;
    switch (operator) {
      case '+':
        result = Number(num1) + Number(num2);
        break;
      case '-':
        result = Number(num1) - Number(num2);
        break;
      case '*':
        result = Number(num1) * Number(num2);
        break;
      case '/':
        result = Number(num1) / Number(num2);
        break;
      default:
        console.log('지원하지 않는 연산자입니다.');
        rl.close();
        return;
    }

    console.log(`결과: ${result}`);
    rl.close();
  });
};


const exist = (dir) => {
  try {
    fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (e) {
    return false;
  }
};

const mkdirp = (dir) => {
  const dirname = path
    .relative('.', path.normalize(dir))
    .split(path.sep)
    .filter(p => !!p);
  dirname.forEach((d, idx) => {
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
    if (!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder);
    }
  });
};

const makeTemplate = () => {
  mkdirp(directory);
  if (type === 'html') {
    const pathToFile = path.join(directory, `${name}.html`);
    if (exist(pathToFile)) {
      console.error('이미 해당 파일이 존재합니다');
    } else {
      fs.writeFileSync(pathToFile, htmlTemplate);
      console.log(pathToFile, '생성 완료');
    }
  } else if (type === 'express-router') {
    const pathToFile = path.join(directory, `${name}.js`);
    if (exist(pathToFile)) {
      console.error('이미 해당 파일이 존재합니다');
    } else {
      fs.writeFileSync(pathToFile, routerTemplate);
      console.log(pathToFile, '생성 완료');
    }
  } else if (type === 'gugudan') {
    gugudanGame();
  } else if (type === 'calculator') {
    calculator();
  } else {
    console.error('html, express-router, gugudan, calculator 중 하나를 입력하세요.');
  }
};

const dirAnswer = (answer) => {
  directory = (answer && answer.trim()) || '.';
  rl.close();
  makeTemplate();
};

const nameAnswer = (answer) => {
  if (!answer || !answer.trim()) {
    console.clear();
    console.log('name을 반드시 입력하셔야 합니다.');
    return rl.question('파일명을 설정하세요. ', nameAnswer);
  }
  name = answer;
  return rl.question('저장할 경로를 설정하세요.(설정하지 않으면 현재경로) ', dirAnswer);
};

const typeAnswer = (answer) => {
  if (answer !== 'html' && answer !== 'express-router' && answer !== 'gugudan' && answer !== 'calculator') {
    console.clear();
    console.log('html, express-router, gugudan, calculator 중 하나를 입력하세요.');
    return rl.question('어떤 템플릿이 필요하십니까? ', typeAnswer);
  }
  type = answer;
  if (type === 'gugudan' || type === 'calculator') {
    makeTemplate();
  } else {
    return rl.question('파일명을 설정하세요. ', nameAnswer);
  }
};

const program = () => {
  if (!type || !name) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    console.clear();
    console.log('html, express-router, gugudan, calculator 중 하나를 입력하세요.');
    rl.question('어떤 템플릿이 필요하십니까? ', typeAnswer);
  } else {
    makeTemplate();
  }
};

program();