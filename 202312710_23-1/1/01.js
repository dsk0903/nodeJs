const answer = ""
+ "블로킹이 발생하는 경우 나머지 작업은 모두 대기해야 하기 때문에 "
+ "논 블로킹 모델을 채택하여 일부 코드(I/O)를 백그라운드(다른 프로세스)에서 실행 가능하게 함"
+ "\n노드 14버전 이후 멀티 스레드를 사용할 수 있도록 worker_threads 모듈 도입"
+ "\n메인 스레드에서 new Worker를 통해 현재 파일(__filename)을 워커 스레드에서 실행시킴"
+ "\nworker.postMessage로 부모에서 워커로 데이터를 보냄"
+ "\nparentPort.on(‘message’)로 부모로부터 데이터를 받고, postMessage로 데이터를 보냄"
;
console.log(answer);