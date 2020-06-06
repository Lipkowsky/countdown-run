import { combineReducers } from "redux";
import {
  LOGIN,
  SIGNUP,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_ERROR,
  ADD_RUN,
  FETCH_RUNS_BEGIN,
  FETCH_RUNS_SUCCESS,
  FETCH_RUNS_FAILURE,
} from "../actions/user";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case SIGNUP:
      return action.payload;
    case UPDATE_EMAIL:
      return { ...state, email: action.payload };
    case UPDATE_PASSWORD:
      return { ...state, password: action.payload };
    case UPDATE_ERROR:
      return { ...state, error: action.payload };
    case ADD_RUN: {
      return { ...state, newRun: action.payload };
    }
    case FETCH_RUNS_BEGIN: {
      return { ...state, loading: true, error: null };
    }
    case FETCH_RUNS_SUCCESS: {
      return { ...state, loading: false, items: action.payload.runs };
    }
    case FETCH_RUNS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
