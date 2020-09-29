import {
    SIGN_IN,
    SIGN_OUT, 
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './types'
import streams from '../apis/streams'
import history from '../history'

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const createStream = (formValues) => {
    return async (dispatch, getState) => {
        //these are thunk functions, remember? you're only supposed to return objects but not with thunk!
        const {userId} = getState().auth
        const response = await streams.post('/streams', {...formValues, userId})
        
        dispatch({ type: CREATE_STREAM, payload: response.data })
        //here we'd like to do some programmatic navigation to get user back to root 
        history.push('/')
    }
}
   
export const fetchStreams = () => {
    return async (dispatch) => {
        const response = await streams.get('/streams')

        dispatch({ type: FETCH_STREAMS, payload: response.data })
    }
}

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`)

    dispatch({ type: FETCH_STREAM, payload: response.data })
}

export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`)

    dispatch({ type: DELETE_STREAM, payload: id})
    history.push('/')
}

export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues)

    dispatch({ type: EDIT_STREAM, payload: response.data })
    history.push('/')
}
