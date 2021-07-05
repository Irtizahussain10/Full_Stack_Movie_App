let users;
let comment;

module.exports.connection = async (client) => {
    if (users && comment) {
        return users, comment;
    };
    users = await client.db('sample_mflix').collection('users');
    comment = await client.db('sample_mflix').collection('comments');
};

//This controller inserts a user document into user database 
module.exports.insertUser = async (user) => {
    try {
        let result = await users.insertOne(user);
        return result.insertedCount;
    } catch (e) {
        console.error(e.result);
        return 'Unable to insert';
    };
};

module.exports.logUserIn = async (userCredentials) => {
    try {
        let projectUser = {
            email: 1,
            name: 1,
            _id: 0
        };
        let user = await users
            .find(userCredentials)
            .project(projectUser)
            .toArray();
        return [...user];
    } catch (e) {
        console.log(e.stack);
        return 'Unable to connect';
    };
};