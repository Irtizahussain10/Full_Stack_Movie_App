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

        let find = {
            email: user.email
        };

        let project = {
            _id: 0,
            email: 1,
            name: 1
        };

        let findUser = await users
            .find(find)
            .project(project)
            .toArray();

        if (!findUser[0]) {

            await users.insertOne(user);
            let data = await users
                .find(find)
                .project(project)
                .toArray();

            console.log(data);

            return [...data];

        };

        if (findUser[0]) {

            return 'The user with this email already exists!';

        };

    } catch (e) {

        if (e.name === 'MongoNetworkError') {
            return ['Server lost connection to the internet'];
        };

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

        if (e.name === 'MongoNetworkError') {
            return ['Server lost connection to the internet'];
        };

    };
};