console.log('starting app');

setTimeout(() => {
  console.log('timed out');
}, 2000);

setTimeout(() => {
  console.log('timed out 2');
}, 0);

console.log('finishing up');
