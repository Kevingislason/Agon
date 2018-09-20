const User = require('./user')
const Submission = require('./submission')
const Comment = require('./comment')
const Rating = require('./rating')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Submission.belongsTo(User)
User.hasMany(Submission)

Comment.belongsTo(User, {as: 'commenter'})

Comment.belongsTo(Submission)
Submission.hasMany(Comment)

Rating.belongsTo(Submission)
Submission.hasMany(Rating)

Rating.belongsTo(User, {as: 'reviewer'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Submission,
  Comment,
  Rating
}
