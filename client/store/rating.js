import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_PENDING_RATINGS = 'GOT_PENDING_RATINGS'
const INITIALIZED_RATINGS = 'INITIALIZED_PENDING_RATINGS'
const SCORED_RATINGS = 'SCORED_RATINGS'
const CLEAR_RATINGS = 'CLEAR_RATINGS'

/**
 * INITIAL STATE
 */
const initialState = {
  pendingRatings: []
}

/**
 * ACTION CREATORS
 */
const gotPendingRatings = ratings => ({
  type: GOT_PENDING_RATINGS,
  ratings
})

const initializedRatings = ratings => ({
  type: INITIALIZED_RATINGS,
  ratings
})

const scoredRatings = () => ({
  type: SCORED_RATINGS
})

export const clearRatings = () => ({
  type: CLEAR_RATINGS
})

/**
 * THUNK CREATORS
 */
export const fetchPendingRatings = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/rating')
      dispatch(gotPendingRatings(response.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const initializeRatings = submissions => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/rating', submissions)
      dispatch(initializedRatings(response.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const scoreRatings = (ratings, scores) => {
  return async dispatch => {
    try {
      const body = {ratings: ratings, scores: scores}
      await axios.put('/api/rating', body)
      dispatch(scoredRatings())
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  console.log('action', action)
  switch (action.type) {
    case GOT_PENDING_RATINGS:
      return {pendingRatings: action.ratings}
    case INITIALIZED_RATINGS:
      return {pendingRatings: action.ratings}
    case SCORED_RATINGS:
      return initialState
    case CLEAR_RATINGS:
      return initialState
    default:
      return state
  }
}
