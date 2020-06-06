import Firebase, { db } from "../config/Firebase.js";

// define types

export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const UPDATE_ERROR = "UPDATE_ERROR";
export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const ADD_RUN = "ADD_RUN";
export const GET_RUNS = "GET_RUNS";

export const FETCH_RUNS_BEGIN = "FETCH_RUNS_BEGIN";
export const FETCH_RUNS_SUCCESS = "FETCH_RUNS_SUCCESS";
export const FETCH_RUNS_FAILURE = "FETCH_RUNS_FAILURE";

export const updateEmail = (email) => {
  return {
    type: UPDATE_EMAIL,
    payload: email,
  };
};

export const updatePassword = (password) => {
  return {
    type: UPDATE_PASSWORD,
    payload: password,
  };
};

export const updateError = (error) => {
  return {
    type: UPDATE_ERROR,
    payload: error,
  };
};

export const login = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().user;
      const response = await Firebase.auth().signInWithEmailAndPassword(
        email,
        password
      );

      dispatch(getUser(response.user.uid));
    } catch (error) {
      dispatch({ type: UPDATE_ERROR, payload: error.message });
    }
  };
};

export const signup = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().user;
      const response = await Firebase.auth().createUserWithEmailAndPassword(
        email,
        password
      );
      if (response.user.uid) {
        const user = {
          uid: response.user.uid,
          email: email,
        };

        db.collection("users").doc(response.user.uid).set(user);

        dispatch({ type: SIGNUP, payload: user });
      }
    } catch (error) {
      alert(error);
      console.log(error);
      dispatch({ type: UPDATE_ERROR, payload: error.message });
    }
  };
};

export const getUser = (uid) => {
  return async (dispatch, getState) => {
    try {
      const user = await db.collection("users").doc(uid).get();

      dispatch({ type: LOGIN, payload: user.data() });
    } catch (e) {
      alert(e);
    }
  };
};

export const addRun = (uid) => {
  return async (dispatch, getState) => {
    try {
      const run = {
        name: "112",
        where: "Poznań",
      };

      const newRun = await db
        .collection("users")
        .doc(uid)
        .collection("Runs")
        .doc(run.name)
        .set(run);

      dispatch({ type: ADD_RUN, payload: newRun });
    } catch (error) {
      alert(error);
    }
  };
};

export const fetchRunsBegin = () => ({
  type: FETCH_RUNS_BEGIN,
});

export const fetchRunsSuccess = (runs) => ({
  type: FETCH_RUNS_SUCCESS,
  payload: { runs },
});

export const fetchRunsFailure = (error) => ({
  type: FETCH_RUNS_FAILURE,
  payload: { error },
});



export const fetchRuns = (uid) => {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchRunsBegin());

      const runs = await db
        .collection("users")
        .doc(uid)
        .collection("Runs")
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            console.log("No matching documents.");
            const newError = Error('Brak dostępnych biegów do wyświetlenia');
            dispatch(fetchRunsFailure(newError));
            return;
          }

          let arrayRuns = [];
          snapshot.forEach((doc) => {
            //console.log(doc.id, '=>', doc.data());
            arrayRuns.push(doc.data());
          });
          dispatch(fetchRunsSuccess(arrayRuns));
        })
        .catch((err) => {
          console.log("Error getting documents", err);
          dispatch(fetchRunsFailure(err));
        });
    } catch (error) {
        dispatch(fetchRunsFailure(error));
    }
  };
};
