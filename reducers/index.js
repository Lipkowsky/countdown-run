import { combineReducers } from 'redux'
import { LOGIN, SIGNUP, UPDATE_EMAIL, UPDATE_PASSWORD, UPDATE_ERROR, ADD_RUN, GET_RUNS } from '../actions/user'

const user = (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
            return action.payload
        case SIGNUP:
            return action.payload
        case UPDATE_EMAIL:
            return { ...state, email: action.payload }
        case UPDATE_PASSWORD:
            return { ...state, password: action.payload }
        case UPDATE_ERROR:
            return {...state, error: action.payload}
        case ADD_RUN: {
            return {...state, newRun: action.payload}
        }
        case GET_RUNS: {
            return {...state, runs: action.payload}
        }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user
})

export default rootReducer