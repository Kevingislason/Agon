import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_FEATURED_SUBMISSIONS = 'GOT_FEATURED_SUBMISSIONS'

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

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_FEATURED_SUBMISSIONS:
      return {...state, featuredSubmissions: action.submissions}
    default:
      return state
  }
}
