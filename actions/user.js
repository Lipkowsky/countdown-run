import Firebase, { db } from '../config/Firebase.js'

// define types

export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const UPDATE_ERROR = 'UPDATE_ERROR'
export const LOGIN = 'LOGIN'
export const SIGNUP = 'SIGNUP'


export const updateEmail = email => {
    return {
        type: UPDATE_EMAIL,
        payload: email
    }
}

export const updatePassword = password => {
    return {
        type: UPDATE_PASSWORD,
        payload: password
    }
}

export const updateError = error => {
    return {
        type: UPDATE_ERROR,
        payload: error
    }
}

export const login = () => {
    return async (dispatch, getState) => {
        try {
            const { email, password } = getState().user
            const response = await Firebase.auth().signInWithEmailAndPassword(email, password)

            dispatch(getUser(response.user.uid))
        } catch (error) {
            dispatch({type: UPDATE_ERROR, payload:  error.message})
        }
    }
}

export const signup = () => {
    return async (dispatch, getState) => {
        try {
            const { email, password } = getState().user
            const response = await Firebase.auth().createUserWithEmailAndPassword(email, password)
            if (response.user.uid) {
                const user = {
                    uid: response.user.uid,
                    email: email
                }

                db.collection('users')
                    .doc(response.user.uid)
                    .set(user)

                dispatch({ type: SIGNUP, payload: user })
            }
        } catch (error) {
            alert(error)
            console.log(error);
            dispatch({type: UPDATE_ERROR, payload: error.message})
        }
    }
}


export const getUser = uid => {
    return async (dispatch, getState) => {
        try {
            const user = await db
                .collection('users')
                .doc(uid)
                .get()

            dispatch({ type: LOGIN, payload: user.data() })
        } catch (e) {
            alert(e)
        }
    }
}