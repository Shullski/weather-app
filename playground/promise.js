var asyncAdd = (a,b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Arguments must be numbers.');
      }
    }, 1500);
  });
}

var somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('This is the new message');
    reject('it didnt work');
  }, 2000);
});

// somePromise.then((message) => {
//   console.log('Success:', message);
// }, (errorMessage) => {
//   console.log('Error:', errorMessage);
// });

asyncAdd(5,7).then((result) => {
  console.log(result);
  return asyncAdd(result, 33);
}).then((result) => {
  console.log(result);
}).catch((errorMessage) => {
  console.log(errorMessage);
});
