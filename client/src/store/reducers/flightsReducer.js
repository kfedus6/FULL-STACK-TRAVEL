export const flightActionTypes = {
    FETCH_POST_FLIGHT: 'FETCH_POST_FLIGHT',
    FETCH_GET_FLIGHTS: 'FETCH_GET_FLIGHTS',
    FETCH_GET_FLIGHT: 'FETCH_GET_FLIGHT',
    FETCH_UPDATE_FLIGHT: 'FETCH_UPDATE_FLIGHT',
    FETCH_UPDATE_STATUS_FLIGHT: 'FETCH_UPDATE_STATUS_FLIGHT',
    FETCH_UPDATE_FLIGHT_CHILD_PRICE: 'FETCH_UPDATE_FLIGHT_CHILD_PRICE',
    FETCH_DELETE_FLIGHT: 'FETCH_GET_FLIGHT',
    FETCH_ERROR_FLIGHT: 'FETCH_ERROR_FLIGHT',
    FETCH_PUT_FLIGHT_STATUS: 'FETCH_PUT_FLIGHT_STATUS',
    FETCH_PUT_FLIGHT_SCHEDULE_BUS: 'FETCH_PUT_FLIGHT_SCHEDULE_BUS',
    FETCH_SEARCH_START_POSTION: 'FETCH_SEARCH_START_POSTION',
    FETCH_SEARCH_FINISH_POSTION: 'FETCH_SEARCH_FINISH_POSTION',
    FETCH_GET_RELINKBLOCKS: "FETCH_GET_RELINKBLOCKS",
    FETCH_SET_RELINKBLOCKD_BLOG:"FETCH_SET_RELINKBLOCKD_BLOG"
}

const initialState = {
    flights: { count: 0, rows: [] },
    flight: [],
    status: [],
    page: 1,
    searchStartPostion: [],
    searchFinishPosition: [],
    relinkBlocks: undefined,
    relinkBlocksBlog:[]
}

export const flightsReducer = (state = initialState, action) => {
    switch (action.type) {
        case flightActionTypes.FETCH_GET_FLIGHTS: {
            return { ...state, flights: action.payload }
        }
        case flightActionTypes.FETCH_GET_FLIGHT: {
            return { ...state, flight: action.payload.flight, status: action.payload.status };
        }
        case flightActionTypes.FETCH_DELETE_FLIGHT: {
            return { ...state, flights: state.flights.rows.filter(f => f.id !== action.payload.id) }
        }
        case flightActionTypes.FETCH_UPDATE_FLIGHT: {
            return { ...state, flights: action.payload }
        }
        case flightActionTypes.FETCH_UPDATE_STATUS_FLIGHT: {
            return { ...state, flights: action.payload.res, status: action.payload.status }
        }
        case flightActionTypes.FETCH_UPDATE_FLIGHT_CHILD_PRICE: {
            return { ...state, flights: action.payload }
        }
        case flightActionTypes.FETCH_PUT_FLIGHT_STATUS: {
            return { ...state, status: action.payload }
        }
        case flightActionTypes.FETCH_SEARCH_START_POSTION: {
            return { ...state, searchStartPostion: action.payload };
        }
        case flightActionTypes.FETCH_SEARCH_FINISH_POSTION: {
            return { ...state, searchFinishPosition: action.payload };
        }
        case flightActionTypes.FETCH_GET_RELINKBLOCKS: {
            return { ...state, relinkBlocks: action.payload };
        }
        case flightActionTypes.FETCH_SET_RELINKBLOCKD_BLOG:{
            return {...state,relinkBlocksBlog:action.payload};
        }
        default: {
            return state
        }
    }
}