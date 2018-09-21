const router = require('express').Router()
const {Submission} = require('../db/models')
const Op = require('sequelize').Op
module.exports = router

//gets the current user's active submissions
router.get('/mine', async (req, res, next) => {
  try {
    const userId = req.user.id
    const submission = await Submission.findOne({
      where: {userId}
    })
    res.json(submission)
  } catch (err) {
    next(err)
  }
})

//Gets 5 submissions with the lowest number of ratings,
//Excluding inactive submissions and the users own submissions
router.get('/others', async (req, res, next) => {
  try {
    const userId = req.user.id
    const submissions = await Submission.findAll({
      limit: 5,
      order: ['numberOfRatings'],
      where: {userId: {[Op.not]: userId}, isActive: {[Op.is]: true}}
    })
    res.json(submissions)
  } catch (err) {
    next(err)
  }
})

//Gets Featured Submissions
router.get('/featured', async (req, res, next) => {
  try {
    const submissions = await Submission.findAll({
      limit: 5,
      order: ['score'],
      where: {featured: true}
    })
    res.json(submissions)
  } catch (err) {
    next(err)
  }
})
