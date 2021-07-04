let comment;

module.exports.connection = async (client) => {
    if (comment) {
        return;
    };
    comment = client.db('sample_mflix').collection('comments');
};

module.exports.deleteComment = async (predicate) => {
    try {
        let result = await comment.deleteOne(predicate);
        return result.deletedCount.toString();
    } catch (e) {
        console.error(e.stack);
        return 'The delete operation failed!';
    };
};
