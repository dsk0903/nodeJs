const answer = ""
+ "-on(이벤트명, 콜백): 이벤트 이름과 이벤트 발생 시의 콜백을 연결해줍니다. "
+ "이렇게 연결하는 동작을 이벤트 리스닝이라고부릅니다."
+ "event2처럼 이벤트 하나에 이벤트 여러 개를 달아줄 수도 있습니다."
+ "\n-addListener(이벤트명, 콜백): on과 기능이 같습니다."
+ "\n-emit(이벤트명): 이벤트를 호출하는 메서드입니다. "
+ "이벤트 이름을 인자로 넣어주면 미리 등록해뒀던 이벤트 콜백이 실행됩니다."
+ "\n-once(이벤트명, 콜백): 한 번만 실행되는 이벤트입니다."
+ "myEvent.emit('event3')을 두 번 연속 호출했지만 콜백이 한 번만 실행됩니다."
+ "\n-removeAllListeners(이벤트명): 이벤트에 연결된 모든 이벤트리스너를 제거합니다"
+ "event4가 호출되기 전에 리스너를 제거했으므로 event4의 콜백은 호출되지 않습니다."
+ "\n-removeListener(이벤트명, 리스너): 이벤트에 연결된 리스너를 하나씩 제거합니다."
+ " 역시event5의 콜백도 호출되지 않습니다."
+ "\n-listenerCount(이벤트명): 현재 리스너가 몇 개 연결되어 있는지 확인합니다."
;
console.log(answer);

// 코드 시작 부분
const eventEmitter = require("events");
const myEvent = new eventEmitter();

myEvent.addListener("event1", () => {
    console.log("이벤트1");
});
myEvent.on("event2", () => {
    console.log("이벤트2");
});
myEvent.on("event2", () => {
    console.log("이벤트2 추가");
});
myEvent.once("event3", () => {
    console.log("이벤트3");
});

myEvent.emit("event1");
myEvent.emit("event2");
myEvent.emit("event3");
myEvent.emit("event3");

myEvent.on("event4", () => {
    console.log("이벤트4");
});

myEvent.removeAllListeners("event4");
myEvent.emit("event4");

const listener = () => {
    console.log("이벤트 5");
};
myEvent.on("event5", listener);
myEvent.removeListener("event5", listener);
myEvent.emit("event5");

console.log(myEvent.listenerCount("event2"));