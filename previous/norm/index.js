const normalizr = require('normalizr');
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;

const schema = normalizr.schema

//Schema Definition

const AuthorsSch = new schema.Entity('authors')
const CommentsSch = new schema.Entity('comments')

const PostSch = new schema.Entity('posts', {
    author: AuthorsSch,
    comment: [CommentsSch]
})

const originalObj = {}
const normalizedObj = normalize(originalObj, PostSch);