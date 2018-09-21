const Sequelize = require('sequelize')
const db = require('../db')
const Submission = require('./submission')

const Rating = db.define('rating', {
  score: {
    type: Sequelize.INTEGER
  }
})

//If a rating is initialized(score should be null), increment submission's rating count
Rating.hook('afterCreate', async (rating, options) => {
  const submissionId = rating.submissionId
  const submission = await Submission.findById(submissionId)
  submission.increment('numberOfRatings', {by: 1})
})

//If a rating is updated with a score, take the submission it's attached to
// Update its score, and make it inactive if its score is too low

Rating.hook('afterUpdate', async (rating, options) => {
  const submissionId = rating.submissionId
  const submission = await Submission.findById(submissionId)
  submission.increment('score', {by: rating.score})
  if (submission.score <= -5) {
    submission.update({status: 'defeated'})
  }
})

//If a rating is removed, decrement its submission's rating count
Rating.hook('afterDestroy', async (rating, options) => {
  const submissionId = rating.submissionId
  const submission = await Submission.findById(submissionId)
  submission.decrement('numberOfRatings', {by: 1})
})

module.exports = Rating
