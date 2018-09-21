import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_FEATURED_SUBMISSIONS = 'GOT_FEATURED_SUBMISSIONS'
const GOT_USER_SUBMISSION = 'GOT_USER_SUBMISSION'
const POSTED_USER_SUBMISSION = 'POSTED_USER_SUBMISSION'

/**
 * INITIAL STATE
 */
const initialState = {
  featuredSubmissions: [],
  submissionsToReview: [],
  userSubmission: {}
}

/**
 * ACTION CREATORS
 */
const gotFeaturedSubmissions = submissions => ({
  type: GOT_FEATURED_SUBMISSIONS,
  submissions: submissions
})

const gotUserSubmission = submission => ({
  type: GOT_USER_SUBMISSION,
  submission: submission
})

const postedUserSubmission = submission => ({
  type: POSTED_USER_SUBMISSION,
  submission: submission
})

/**
 * THUNK CREATORS
 */
export const fetchFeaturedSubmissions = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/submission/featured')
      dispatch(gotFeaturedSubmissions(response.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchUserSubmission = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/submission/mine')
      dispatch(gotUserSubmission(response.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const postUserSubmission = submission => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/submission/', submission)
      dispatch(postedUserSubmission(response.data))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_FEATURED_SUBMISSIONS:
      return {...state, featuredSubmissions: action.submissions}
    case GOT_USER_SUBMISSION:
      return {...state, userSubmission: action.submission}
    case POSTED_USER_SUBMISSION:
      return {...state, userSubmission: action.submission}
    default:
      return state
  }
}
