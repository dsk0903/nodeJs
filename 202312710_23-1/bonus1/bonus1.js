// 일반 함수
function add1(x, y) {
    return x + y;
};

// 화살표 함수1
const add2 = (x, y) => {
    return x + y;
};

// 화살표 함수2
const add3 = (x, y) => x + y;

// 화살표 함수3
const add4 = (x, y) => (x + y);

console.log(add1(1,0));
console.log(add2(1,1));
console.log(add3(1,2));
console.log(add4(1,3));