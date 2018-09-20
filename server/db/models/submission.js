const Sequelize = require('sequelize')
const db = require('../db')

const Submission = db.define('submission', {
  content: {
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  numberOfCompletedRatings: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  numberOfPendingRatings: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

// Submission.hook('beforeSave', (submission, options) => {
//   if (submission.score >= -5) {
//     this.isActive = false
//   }
// })

module.exports = Submission
