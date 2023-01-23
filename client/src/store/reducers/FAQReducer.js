export const FAQActionTypes = {
    FAQ_GET: "FAQ_GET",
    FAQ_NOVETLY_GET: "FAQ_NOVETLY_GET",
    FAQ_SELECT_FAQ: "FAQ_SELECT_FAQ",
    DELETE_SELECT_FAQ: "DELETE_SELECT_FAQ"
}

const initialState = {
    FAQList: undefined,
    FAQNovetly: undefined,
    page: 1,
    limit: 10,
    countFAQ: 0,
    selectFAQ: undefined
}

export const FAQReducer = (state = initialState, action) => {
    switch (action.type) {
        case FAQActionTypes.FAQ_GET: {
            return { ...state, FAQList: action.payload.res, page: action.payload.page, limit: action.payload.limit, countFAQ: action.payload.count };
        }
        case FAQActionTypes.DELETE_SELECT_FAQ: {
            return { ...state, FAQList: action.payload.res, page: action.payload.page, limit: action.payload.limit, countFAQ: action.payload.count };
        }
        case FAQActionTypes.FAQ_NOVETLY_GET: {
            return { ...state, FAQNovetly: action.payload };
        }
        case FAQActionTypes.FAQ_SELECT_FAQ: {
            return { ...state, selectFAQ: action.payload };
        }
        default: return state;
    }
}