const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Executing Promise 1....");
        resolve(1);
    }, 2000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Executing Promise 2....");
        resolve(2);
    }, 2000);
});

// Result available when each promises executed 
Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log(err.message));

// Result displayed when any one of the promise completed execution    
// Promise.race([p1, p2])
// .then(result => console.log(result))
// .catch(err => console.log(err.message));
