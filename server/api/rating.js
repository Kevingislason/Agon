const router = require('express').Router()
const {Rating} = require('../db/models')
const UserMW = require('./middleware')
const Op = require('sequelize').Op
var moment = require('moment')
module.exports = router

//Initializes pending ratings with score of null
//Req.body should contain 5 submissions
router.post('/', async (req, res, next) => {
  try {
    const reviewerId = req.user.id
    const infoForRaings = req.body.map(submission => ({
      submissionId: submission.id,
      reviewerId: reviewerId
    }))
    const ratings = await Rating.bulkCreate(infoForRaings, {returning: true})
    res.send(ratings)
  } catch (err) {
    next(err)
  }
})

//Updates pending ratings to include a score
//Req.body should reviews and scores
router.put('/', async (req, res, next) => {
  try {
    console.log(req.body)
    const scores = req.body.scores
    const ratings = req.body.ratings
    for (let i = 0; i < ratings.length; i++) {
      let rating = await Rating.findById(ratings[i].id)
      let score = scores[i]
      rating.update({score})
    }
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

//Get all pending reviews (Should never be more than 5)
router.get('/', async (req, res, next) => {
  try {
    const reviewerId = req.user.id
    const ratings = await Rating.findAll({where: {score: null, reviewerId}})
    res.json(ratings)
  } catch (err) {
    next(err)
  }
})

//Deletes all old incomplete ratings
//truncate????
// router.delete('/', async (req, res, next) => {
//   try {
//     const date = moment('MM-DD-YYYY')
//     await Rating.destroy({
//       where: {
//         [Op.and]: [
//           {
//             score: {
//               [Op.is]: null
//             }
//           },
//           {
//             createdAt: {
//               [Op.lt]: date.toDate()
//             }
//           }
//         ]
//       }
//     })
//     res.sendStatus(200)
//   } catch (err) {
//     next(err)
//   }
// })
