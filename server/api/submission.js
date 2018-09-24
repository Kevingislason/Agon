const router = require('express').Router()
const {Submission, Rating} = require('../db/models')
const Op = require('sequelize').Op
module.exports = router

//Gets the current user's active, pending, or defeated submission, if any
router.get('/mine', async (req, res, next) => {
  try {
    const userId = req.user.id
    const submission = await Submission.findOne({
      where: {userId, status: {[Op.not]: ['expired', 'featured']}}
    })
    if (!submission) {
      res.sendStatus(404)
    } else {
      res.json(submission)
    }
  } catch (err) {
    next(err)
  }
})

//Gets 5 submissions with the lowest number of ratings,
//Excluding inactive submissions and the users own submissions
router.get('/ready-for-review', async (req, res, next) => {
  try {
    const userId = req.user.id
    const submissions = await Submission.findAll({
      limit: 5,
      order: ['numberOfRatings'],
      where: {userId: {[Op.not]: userId}, status: {[Op.eq]: 'active'}}
    })
    res.json(submissions)
  } catch (err) {
    next(err)
  }
})

//(I think this route may be insecure; any user can see any submissions)!!!!!
//(I could probably write this route with only I query if I used 'include')
//Given an array of reviews, returns the corresponsing submissions
router.get('/assigned-for-review', async (req, res, next) => {
  try {
    const ratings = await Rating.findAll({
      where: {reviewerId: req.user.id, score: null}
    })
    const submissionsIds = ratings.map(rating => rating.submissionId)
    const submissions = await Submission.findAll({
      where: {id: {[Op.in]: submissionsIds}}
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
      where: {status: 'featured'}
    })
    if (submissions.length === 0) {
      res.sendStatus(404)
    } else {
      res.json(submissions)
    }
  } catch (err) {
    next(err)
  }
})

//Takes an object containing title, content, and userId, posts a new pending submission
//Doesn't allow a user to submit if they have an active submission
router.post('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    const submission = await Submission.findOne({
      where: {userId, status: {[Op.not]: ['expired', 'featured']}}
    })
    if (submission) {
      res.sendStatus(403)
    } else {
      const newSubmission = await Submission.create(req.body)
      res.json(newSubmission)
    }
  } catch (err) {
    next(err)
  }
})

//activates a pending submission

router.put('/', async (req, res, next) => {
  try {
    console.log(req.body)
    const submissionId = req.body.id
    const submission = await Submission.findById(submissionId)
    submission.update({status: 'active'})
    res.json(submission)
  } catch (err) {
    next(err)
  }
})
