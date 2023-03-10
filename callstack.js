function first() {
  second();
  console.log('a');
}
function second() {
  third();
  console.log('b');
}
function third() {
  console.log('c');
}
first();
