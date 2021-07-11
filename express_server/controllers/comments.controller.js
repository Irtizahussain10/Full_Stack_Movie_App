let comment;

module.exports.connection = async (client) => {

    if (comment) {
        return;
    };

    comment = client
        .db('sample_mflix')
        .collection('comments');

};

module.exports.findComments = async (predicate) => {

    try {

        let pipeline = [
            {
                $match: {
                    email: predicate.email,
                    name: predicate.name
                },
            }
            , {
                $lookup: {
                    from: 'movies',
                    let: {
                        id: '$movie_id'
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [
                                        "$_id", "$$id"
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                title: 1
                            }
                        }
                    ],
                    as: "movie_name"
                }
            }
        ];

        let projection = {
            movie_id: 0,
            name: 0,
            email: 0
        };

        let comments = await comment
            .aggregate(pipeline)
            .project(projection)
            .toArray();

        return comments;

    } catch (e) {

        if (e.name === 'MongoNetworkError') {
            return ['Server lost connection to the internet'];
        };

    };

};

module.exports.deleteComment = async (predicate) => {

    try {

        let result = await comment
            .deleteOne(predicate);

        return result
            .deletedCount
            .toString();

    } catch (e) {

        if (e.name === 'MongoNetworkError') {
            return ['Server lost connection to the internet'];
        };

    };

};

module.exports.insertComment = async (predicate) => {

    try {

        let result = await comment
            .insertOne(predicate);

        return result.insertedId;

    } catch (e) {

        if (e.name === 'MongoNetworkError') {
            return ['Server lost connection to the internet'];
        };

    };
};