export const flightOrdersActionTypes = {
    FETCH_POST_ORDER: "FETCH_POST_ORDER",
    FETCH_GET_ORDER: "FETCH_GET_ORDER",
    FETCH_PUT_ORDER: "FETCH_PUT_ORDER",
    FETCH_PUT_ORDER_STATUS_PAYMENT: "FETCH_PUT_ORDER_STATUS_PAYMENT",
    FETCH_PUT_ORDER_STATUS_PREPAYMENT: "FETCH_PUT_ORDER_STATUS_PREPAYMENT",
    FETCH_PUT_ORDER_STATUS_SUCCESS: "FETCH_PUT_ORDER_STATUS_SUCCESS",
    FETCH_DELETE_ORDER: "FETCH_DELETE_ORDER",
    GET_HISTORY_USER: "GET_HISTORY_USER",
    FETCH_GET_FLIGHT_ACCOUNT_ORDER: "FETCH_GET_FLIGHT_ACCOUNT_ORDER"
}

const initialState = {
    flightOrders: { rows: [], count: 0 },
    flightAccountOrders: [],
    userHistoty: []
}

export const flightOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case flightOrdersActionTypes.FETCH_GET_ORDER: {
            return { ...state, flightOrders: action.payload }
        }
        case flightOrdersActionTypes.FETCH_PUT_ORDER: {
            return { ...state, flightOrders: action.payload }
        }
        case flightOrdersActionTypes.FETCH_PUT_ORDER_STATUS_PAYMENT: {
            return { ...state, flightOrders: action.payload }
        }
        case flightOrdersActionTypes.FETCH_PUT_ORDER_STATUS_PREPAYMENT: {
            return { ...state, flightOrders: action.payload }
        }
        case flightOrdersActionTypes.FETCH_PUT_ORDER_STATUS_SUCCESS: {
            return { ...state, flightOrders: action.payload }
        }
        case flightOrdersActionTypes.FETCH_DELETE_ORDER: {
            return { ...state, flightOrders: action.payload }
        }
        case flightOrdersActionTypes.GET_HISTORY_USER: {
            return { ...state, userHistoty: action.payload }
        }
        case flightOrdersActionTypes.FETCH_GET_FLIGHT_ACCOUNT_ORDER: {
            return { ...state, flightAccountOrders: action.payload }
        }
        default: {
            return state
        }
    }
}