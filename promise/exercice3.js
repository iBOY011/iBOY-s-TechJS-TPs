console.log("Program Started");

const promise = new Promise((resolve, reject) => {
    console.log("First Promise started");
    setTimeout(resolve, 3000, "Step 1 completed");
});

console.log(promise);
console.log("Program in progress...");


promise.then((message1) => {
    console.log(message1);
    const secondPromise = new Promise((resolve, reject) => {
        console.log("Second Promise started");
        setTimeout(resolve, 3000, "Step 2 completed");
    });

    console.log(secondPromise);
    console.log("Program 2 in progress...");

    secondPromise.then((message2) => {
        console.log(message2);
    });
    
})


