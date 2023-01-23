import { LanguageActionTypes } from "../reducers/languageReducer"

export const setLanguage = (language) => async (dispatch) => {
    dispatch({ type: LanguageActionTypes.FETCH_SET_LANGUAGE, payload: (language == "RU" ? 1 : 0) });
}