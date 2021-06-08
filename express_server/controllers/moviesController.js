const client = require('../connection');

module.exports.readFiles = async () => {
    try {
        await client.connect();
        let movie = await client.db('sample_mflix').collection('movies').findOne({});
        return movie;
    } catch (e) {
        console.error(e.stack);
    };
};