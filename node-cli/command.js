#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

const htmlTemplate = `
<!DOCTYPE html>
  <html>
  <head>
    <meta chart="utf-8" />
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

// 구구단 게임 함수
const gugudanGame = () => {
  // 랜덤한 일의 자리 수 두 개를 생성해서 구구단 문제를 출제
  const number1 = Math.floor(Math.random() * 9) + 1;
  const number2 = Math.floor(Math.random() * 9) + 1;
  // 정답 저장
  const answer = number1 * number2;

  console.log(`${number1} x ${number2} = ? `);

  inquirer.prompt([{
    type: 'number',
    name: 'userAnswer',
    message: '정답을 입력하세요: ',
  }])
    .then((answers) => {
      const userAnswer = parseInt(answers.userAnswer);
      // 입력값과 정답을 비교
      if (userAnswer === answer) {
        console.log('정답입니다!');
      } else {
        console.log('오답입니다.');
        // 오답일 경우 다시 함수를 호출
        gugudanGame();
      }
    });
};

// 계산기 함수
const calculator = () => {
  inquirer.prompt([{
    type: 'input',
    name: 'expression',
    message: '계산할 연산식을 입력하세요 (예: 2 + 3): ',
  }])
    .then((answers) => {
      const expression = answers.expression;
      const [num1, operator, num2] = expression.split(' ');

      let result;
      // 사칙연산을 switch case문을 활용하여 구현
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
          return;
      }

      console.log(`결과: ${result}`);
    });
};

const makeTemplate = (type, name, directory) => {
  mkdirp(directory);
  if (type === 'html') {
    const pathToFile = path.join(directory, `${name}.html`);
    if (exist(pathToFile)) {
      console.error(chalk.bold.red('이미 해당 파일이 존재합니다'));
    } else {
      fs.writeFileSync(pathToFile, htmlTemplate);
      console.log(chalk.green(pathToFile, '생성 완료'));
    }
  } else if (type === 'express-router') {
    const pathToFile = path.join(directory, `${name}.js`);
    if (exist(pathToFile)) {
      console.error(chalk.bold.red('이미 해당 파일이 존재합니다'));
    } else {
      fs.writeFileSync(pathToFile, routerTemplate);
      console.log(chalk.green(pathToFile, '생성 완료'));
    }
  } else if (type === 'gugudan') {
    gugudanGame();
  } else if (type === 'calculator') {
    calculator();
  } else {
    console.error(chalk.bold.red('html, express-router, gugudan, calculator 중 하나를 입력하세요.'));
  }
};

program
  .version('0.0.1', '-v, --version')
  .name('cli');

program
  .command('template <type>')
  .usage('<type> --filename [filename] --path [path]')
  .description('템플릿을 생성합니다.')
  .alias('tmpl')
  .option('-f, --filename [filename]', '파일명을 입력하세요.', 'index')
  .option('-d, --directory [path]', '생성 경로를 입력하세요', '.')
  .action((type, options, command) => {
    makeTemplate(type, options.filename, options.directory);
  });

  program
  .action((options, command) => {
    if (command.args.length !== 0) {
      console.log(chalk.bold.red('해당 명령어를 찾을 수 없습니다.'));
      program.help();
    }
    {
      inquirer.prompt([{
        type: 'list',
        name: 'type',
        message: '템플릿 종류를 선택하세요.',
        choices: ['html', 'express-router', 'gugudan', 'calculator'],
      }])
        .then((answers) => {
          // 구구단과 계산기는 파일을 만들 필요가 없으므로 조건문으로 분리
          if (answers.type === 'gugudan') {
            console.log(chalk.bold('구구단 게임을 실행합니다.'));
            gugudanGame();
          } else if(answers.type === 'calculator') {
            console.log(chalk.bold('계산기를 실행합니다.'));
            calculator();
          }else {
            // 구구단과 계산기가 아닌 템플릿만 생성
            inquirer.prompt([{
              type: 'confirm',
              name: 'confirm',
              message: '생성하시겠습니까?',
            }])
              .then((confirmAnswer) => {
                if (confirmAnswer.confirm) {
                  inquirer.prompt([{
                    type: 'input',
                    name: 'name',
                    message: '파일의 이름을 입력하세요.',
                    default: 'index',
                  }, {
                    type: 'input',
                    name: 'directory',
                    message: '파일이 위치할 폴더의 경로를 입력하세요.',
                    default: '.',
                  }])
                    .then((fileAnswers) => {
                      makeTemplate(answers.type, fileAnswers.name, fileAnswers.directory);
                      console.log(chalk.rgb(128, 128, 128)('터미널을 종료합니다.'));
                    });
                }
              });
          }
        });
    }
  })
  .parse(process.argv);