import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_FEATURED_SUBMISSIONS = 'GOT_FEATURED_SUBMISSIONS'
const GOT_USER_SUBMISSION = 'GOT_USER_SUBMISSION'
const GOT_SUBMISSIONS_TO_REVIEW = 'GOT_OTHER_SUBMISSIONS'
const GOT_ASSIGNED_SUBMISSIONS = 'GOT_ASSIGNED_SUBMISSIONS'
const POSTED_USER_SUBMISSION = 'POSTED_USER_SUBMISSION'
const CLEAR_SUBMISSIONS = 'CLEAR_SUBMISSIONS'
const ACTIVATED_SUBMISSION = 'ACTIVATED_SUBMISSION'

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

const gotSubmissionsToReview = submissions => ({
  type: GOT_SUBMISSIONS_TO_REVIEW,
  submissions
})

const gotAssignedSubmissions = submissions => ({
  type: GOT_ASSIGNED_SUBMISSIONS,
  submissions
})

const postedUserSubmission = submission => ({
  type: POSTED_USER_SUBMISSION,
  submission: submission
})

const activatedSubmission = submission => ({
  type: ACTIVATED_SUBMISSION,
  submission
})

export const clearSubmissions = () => ({
  type: CLEAR_SUBMISSIONS
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

//If user hasn't already been assigned submissions to review
export const fetchSubmissionsToReview = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/submission/ready-for-review')
      dispatch(gotSubmissionsToReview(response.data))
    } catch (err) {
      console.error(err)
    }
  }
}

//If user HAS already been assigned submissions to review
export const fetchAssignedSubmissions = ratings => {
  return async dispatch => {
    try {
      const response = await axios.get(
        '/api/submission/assigned-for-review',
        ratings
      )
      console.log('response.data', response.data)
      dispatch(gotAssignedSubmissions(response.data))
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

export const activateSubmission = submission => {
  return async dispatch => {
    try {
      const response = await axios.put('/api/submission/', submission)
      dispatch(activatedSubmission(response.data))
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
    case GOT_SUBMISSIONS_TO_REVIEW:
      return {...state, submissionsToReview: action.submissions}
    case GOT_ASSIGNED_SUBMISSIONS:
      return {...state, submissionsToReview: action.submissions}
    case POSTED_USER_SUBMISSION:
      return {...state, userSubmission: action.submission}
    case GOT_USER_SUBMISSION:
      return {...state, userSubmission: action.submission}
    case CLEAR_SUBMISSIONS:
      return {...state, userSubmission: '', submissionsToReview: []}
    case ACTIVATED_SUBMISSION:
      return {
        ...state,
        userSubmission: action.submission,
        submissionsToReview: []
      }

    default:
      return state
  }
}
