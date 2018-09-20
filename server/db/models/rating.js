const Sequelize = require('sequelize')
const db = require('../db')
const Submission = require('./submission')

const Rating = db.define('rating', {
  score: {
    type: Sequelize.INTEGER
  }
})

//If a rating is initialized(score should be null), add a pending rating to submission
Rating.hook('afterCreate', async (rating, options) => {
  const submissionId = rating.submissionId
  const submission = await Submission.findById(submissionId)
  submission.increment('numberOfPendingRatings', {by: 1})
})

//If a rating is updated with a score, take the submission it's attached to
//Increment its pending rating count, decrement its completed rating count,
// Update its score, and make it inactive if its score is too low

Rating.hook('afterUpdate', async (rating, options) => {
  const submissionId = rating.submissionId
  const submission = await Submission.findById(submissionId)
  submission.increment('numberOfCompletedRatings', {by: 1})
  submission.decrement('numberOfPendingRatings', {by: 1})
  submission.increment('score', {by: rating.score})
  if (submission.score <= -5) {
    submission.update({isActive: false})
  }
})

module.exports = Rating
