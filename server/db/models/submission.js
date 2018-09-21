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
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  numberOfRatings: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  featured: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Submission
