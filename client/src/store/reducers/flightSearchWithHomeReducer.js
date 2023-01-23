export const flightsSearchWithHomeActionTypes = {
    FETCH_SET_REALITY: "FETCH_SET_REALITY",
    FETCH_SET_INFO: "FETCH_SET_INFO"
}

const initialState = {
    startPositionInitial: "",
    finishPositionInitial: "",
    startDateInitial: "",
    finishDateInitial: "",
    sumOldInitial: 1,
    sumYoungInitial: 0
}

export const flightsSearchWithHomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case flightsSearchWithHomeActionTypes.FETCH_SET_INFO: {
            return {
                ...state, startPositionInitial: action.payload.startPosition, finishPositionInitial: action.payload.finishPosition,
                startDateInitial: action.payload.startDate, finishDateInitial: action.payload.finishDate, sumOldInitial: action.payload.sumOld, sumYoungInitial: action.payload.sumYoung
            };
        }
        default: return state;
    }
}