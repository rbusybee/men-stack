console.log('Before');
getUser(1, (user) => {
    getRepository(user.name, displayRepository);
});
console.log('After');

function getRepository(user) {
    getRepository(user.name, displayRepository);
}

function displayRepository(repos) {
    console.log('Repo Details', repos);
}

// Callback Hell
// console.log('Before');
// getUser(1, (user) => {
//     console.log('user', user);
//     getRepository(user.name, (repo) => {
//         console.log('Repo Details', repo);
//     });
// });
// console.log('After');

function getUser(id, callback) {
    setTimeout(()=>{
        console.log('Fetching data from Database');
        callback({ id: id, name: 'romio'});
    }, 2000);
}

function getRepository(username, callback) {
    setTimeout(()=>{
        console.log('Fetching Git Repository of:', username);
        callback(['repo1','repo2','repo3']);
    }, 2000);
}