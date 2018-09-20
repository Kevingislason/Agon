const router = require('express').Router()
const {Submission} = require('../db/models')
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

// router.get('/others', async (req, res, next) => {
//   try {

//   } catch (err) {
//     next(err)
//   }
// })
