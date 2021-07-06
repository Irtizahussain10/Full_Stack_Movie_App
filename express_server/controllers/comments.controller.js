let comment;

module.exports.connection = async (client) => {
    if (comment) {
        return;
    };
    comment = client.db('sample_mflix').collection('comments');
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
        return 'Not able to find';
    };
};

module.exports.deleteComment = async (predicate) => {
    try {
        let result = await comment
            .deleteOne(predicate);
        return result.deletedCount.toString();
    } catch (e) {
        console.error(e.stack);
        return 'The delete operation failed!';
    };
};