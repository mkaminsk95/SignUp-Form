const fs = require("fs");

function save(newUser) {

    var usersDB;
    
    fs.readFile('users.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {

            usersDB = JSON.parse(data); //now it an object
            usersDB.users.push(newUser); //add some data

            json = JSON.stringify(usersDB, null, 2); //convert it back to json

            fs.writeFile('users.json', json, 'utf8', (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Data written");
                }
            });
        }
    });

}

function authenticate(credentials) {

    var usersDB, data;

    data = fs.readFileSync('users.json');
    usersDB = JSON.parse(data);

    for (let id = 0; id < usersDB.users.length; id++) {

        if (usersDB.users[id].email === credentials.email && usersDB.users[id].password === credentials.password) {
            console.log('logged in');
            return {firstName: usersDB.users[id].firstName, secondName: usersDB.users[id].secondName};
        }
    }

    return false;
}


module.exports.authenticate = authenticate;
module.exports.save = save;