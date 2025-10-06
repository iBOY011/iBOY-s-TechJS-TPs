console.log("Program Started");

const promise = new Promise((resolve, reject) => {
    setTimeout(resolve, 3000);
});

console.log(promise);
console.log("Program in progress...");

promise.then( () => {
    console.log("Promise Resolved");
});


// OU


// console.log("Program Started");

// const promise = new Promise((resolve, reject) => {
//     setTimeout(resolve, 3000, "Promise Resolved");
// });

// console.log(promise);
// console.log("Program in progress...");

// promise.then( (result) => {
//     console.log(result);
// });