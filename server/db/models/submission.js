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
  title: {
    type: Sequelize.STRING,
    defaultValue: 'Unititled'
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  status: {
    type: Sequelize.ENUM(
      'pending',
      'active',
      'defeated',
      'expired',
      'featured'
    ),
    defaultValue: 'pending'
  },
  numberOfRatings: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Submission
