const router = require('express').Router()
const {Rating} = require('../db/models')
const UserMW = require('./middleware')
const Op = require('sequelize').Op
var moment = require('moment')
module.exports = router

//Posts a pending rating with a score of null
//Req.body should contain submissionId and reviewerId
router.post('/', async (req, res, next) => {
  try {
    await Rating.create(req.body)
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

//Updates a pending rating to include a score
//Req.body should contain submissionId, reviewerId, and a score
router.put('/', async (req, res, next) => {
  try {
    const score = req.body.score
    const submissionId = req.body.submissionId
    const reviewerId = req.body.reviewerId
    const rating = await Rating.findOne({where: {reviewerId, submissionId}})
    if (rating.score !== null) {
      rating.increment('score', {by: score})
    } else {
      rating.update({score})
    }
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

//Deletes all old incomplete ratings
//truncate????
router.delete('/', async (req, res, next) => {
  try {
    const date = moment('MM-DD-YYYY')
    await Rating.destroy({
      where: {
        [Op.and]: [
          {
            score: {
              [Op.is]: null
            }
          },
          {
            createdAt: {
              [Op.lt]: date.toDate()
            }
          }
        ]
      }
    })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
