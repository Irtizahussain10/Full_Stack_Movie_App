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
        let { email, password } = userCredentials;
        let findUser = {
            email: email,
            password: password
        };
        let projectUser = {
            email: 1,
            name: 1,
            _id: 0
        };
        let user = await users
            .find(findUser)
            .project(projectUser)
            .toArray();
        let findComment = {
            email: email
        };
        let projectComment = {
            _id: 1,
            date: 1,
            text: 1
        };
        let sort = {
            date: -1
        };
        let comments = await comment
            .find(findComment)
            .project(projectComment)
            .sort(sort)
            .toArray();
        return [...user, [...comments]];
    } catch (e) {
        console.log(e.stack);
        return 'Unable to connect';
    };
};