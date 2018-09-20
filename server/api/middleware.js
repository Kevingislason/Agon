//Prevents non-users from making api requests
//Prevents users from impersonating other users in api requests

const UserMW = (req, res, next) => {
  if (
    req.user &&
    (req.user.id === req.body.userId ||
      req.user.id === req.reviewerId ||
      req.user.id === req.commenterId)
  ) {
    next()
  } else {
    res.status(401).end()
  }
}

module.exports = UserMW
