export const LanguageActionTypes = {
    FETCH_SET_LANGUAGE: 'FETCH_SET_LANGUAGE',
}

const initialState = {//0-ua; 1-ru
    language: localStorage.getItem("i18nextLng") == undefined ? 0 : localStorage.getItem("i18nextLng") == "UA" ? 0 : 1
}

export const languageyReducer = (state = initialState, action) => {
    switch (action.type) {
        case LanguageActionTypes.FETCH_SET_LANGUAGE: {
            return { ...state, language: action.payload }
        }
        default: {
            return state
        }
    }
}