export const novetlyActionTypes = {
    FETCH_POST_NOVETLY: 'FETCH_POST_NOVETLY',
    FETCH_GET_NOVETLY: 'FETCH_POST_NOVETLY',
    FETCH_ERROR_NOVETLY: 'FETCH_ERROR_NOVETLY'
}

const initialState = {
    novetly: []
}

export const novetlyReducer = (state = initialState, action) => {
    switch (action.type) {
        case novetlyActionTypes.FETCH_GET_NOVETLY: {
            return { ...state, novetly: action.payload }
        }
        default: {
            return state
        }
    }
}