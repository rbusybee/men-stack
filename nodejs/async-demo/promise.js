const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({name: 'Romio'});
        // reject(new Error('Unable to connect DB'));  
    }, 2000);
});

p
.then(result => console.log('Result: ',result))
.catch(err => console.log('Error: ',err.message));