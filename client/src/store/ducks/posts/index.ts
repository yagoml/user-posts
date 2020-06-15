import { PostsState, PostsTypes } from './types'
import { Reducer } from 'redux'

const INITIAL_STATE: PostsState = {
  data: { docs: [], page: 1, total: 0 },
  loading: false,
  error: false
}

const reducer: Reducer<PostsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PostsTypes.LOAD_REQUEST:
      return { ...state, loading: true }
    case PostsTypes.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data
      }
    case PostsTypes.LOAD_FAILURE:
      return { ...state, loading: false, error: true, data: [] }
    default:
      return state
  }
}

export default reducer
