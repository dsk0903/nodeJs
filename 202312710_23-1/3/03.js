const answer = ""
+ "다이내믹 임포트(dynamic import)를 사용하여 모듈을 동적으로 불러오는 방식은 ECMAScript 모듈에서 지원하는 기능으로, "
+ "실행 시간(runtime)에 모듈을 동적으로 가져와서 사용할 수 있습니다. "
+ "\n탑레벨 어웨이트(top-level await)를 사용하여 모듈을 불러오는 방식은 ECMAScript 모듈에서 지원하는 기능으로, "
+ "모듈 최상위 레벨에서 await 키워드를 사용하여 비동기 작업을 수행할 수 있습니다."
;
console.log(answer);

// 다이내믹 임포트
const modulePath = "./dynamic.js";
const myModule = import(modulePath);
