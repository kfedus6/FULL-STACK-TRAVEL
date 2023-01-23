import { t } from "i18next";
import { $authHost, $host } from "../../http/index";
import { flightOrdersActionTypes } from "../reducers/flightOrdersReducer";
import { messageActionTypes } from "../reducers/messageReducer";

export const postFlightOrder = (data) => async (dispatch) => {
    try {
        const response = await $authHost.post('api/flightOrder/add', data);
        if (response.data.status == 200) {
            dispatch({ type: flightOrdersActionTypes.FETCH_POST_ORDER, payload: response.data.res })
            dispatch({ type: messageActionTypes.SET_SHOW_TRUE, payload: t("message.successfully_added_operator") });
            setTimeout(() => dispatch({ type: messageActionTypes.SET_SHOW_FALSE }), 9000);
        } else {
            dispatch({ type: messageActionTypes.SET_SHOW_TRUE, payload: "error" });
            setTimeout(() => dispatch({ type: messageActionTypes.SET_SHOW_FALSE }), 3000);
        }
    } catch (err) {
        console.log(err.message)
    }
}

export const getFlightOrder = (data) => async (dispatch) => {
    try {
        const response = await $authHost.get('api/flightOrder/getOrders', {
            params: {
                ...data
            }
        })
        console.log(response, data);
        if (response.data.status == 200) {
            dispatch({ type: flightOrdersActionTypes.FETCH_GET_ORDER, payload: response.data.res })
        }
        else console.log(response);
    } catch (err) {
        console.log(err.message)
    }
}

export const putFlightOrder = (status, id, page, limit, countTicket) => async (dispatch) => {
    try {
        const response = await $authHost.put('api/flightOrder/setStatus', { status, id, page, limit, countTicket });
        if (response.data.status == 200) {
            dispatch({ type: messageActionTypes.SET_SHOW_TRUE, payload: t("message.successfully_added") });
            setTimeout(() => dispatch({ type: messageActionTypes.SET_SHOW_FALSE }), 3000);
            dispatch({ type: flightOrdersActionTypes.FETCH_PUT_ORDER, payload: response.data.res })
        } else {
            dispatch({ type: messageActionTypes.SET_SHOW_TRUE, payload: "error" });
            setTimeout(() => dispatch({ type: messageActionTypes.SET_SHOW_FALSE }), 3000);
        }
    } catch (err) {
        console.log(err.message)
    }
}

export const putFlightOrderStatusPayment = (statusPayment, id, page, limit, countTicket) => async (dispatch) => {
    try {
        const response = await $authHost.put('api/flightOrder/setStatusPayment', { statusPayment, id, page, limit, countTicket });
        if (response.data.status == 200) {
            dispatch({ type: messageActionTypes.SET_SHOW_TRUE, payload: t("message.successfully_added") });
            setTimeout(() => dispatch({ type: messageActionTypes.SET_SHOW_FALSE }), 3000);
            dispatch({ type: flightOrdersActionTypes.FETCH_PUT_ORDER_STATUS_PAYMENT, payload: response.data.res })
        } else {
            dispatch({ type: messageActionTypes.SET_SHOW_TRUE, payload: "error" });
            setTimeout(() => dispatch({ type: messageActionTypes.SET_SHOW_FALSE }), 3000);
        }
    } catch (err) {
        console.log(err.message)
    }
}

export const putFlightOrderStatusPrePayment = (statusPrePayment, id, page, limit, countTicket) => async (dispatch) => {
    try {
        const response = await $authHost.put('api/flightOrder/setStatusPrePayment', { statusPrePayment, id, page, limit, countTicket });
        if (response.data.status == 200) {
            dispatch({ type: messageActionTypes.SET_SHOW_TRUE, payload: t("message.successfully_added") });
            setTimeout(() => dispatch({ type: messageActionTypes.SET_SHOW_FALSE }), 3000);
            dispatch({ type: flightOrdersActionTypes.FETCH_PUT_ORDER_STATUS_PREPAYMENT, payload: response.data.res })
        } else {
            dispatch({ type: messageActionTypes.SET_SHOW_TRUE, payload: "error" });
            setTimeout(() => dispatch({ type: messageActionTypes.SET_SHOW_FALSE }), 3000);
        }
    } catch (err) {
        console.log(err.message)
    }
}

export const putFlightOrderStatusSuccess = (statusSuccess, id, page, limit, countTicket) => async (dispatch) => {
    try {
        const response = await $authHost.put('api/flightOrder/setStatusSuccess', { statusSuccess, id, page, limit, countTicket });
        if (response.data.status == 200) {
            dispatch({ type: messageActionTypes.SET_SHOW_TRUE, payload: t("message.successfully_added") });
            setTimeout(() => dispatch({ type: messageActionTypes.SET_SHOW_FALSE }), 3000);
            dispatch({ type: flightOrdersActionTypes.FETCH_PUT_ORDER_STATUS_SUCCESS, payload: response.data.res })
        } else {
            dispatch({ type: messageActionTypes.SET_SHOW_TRUE, payload: "error" });
            setTimeout(() => dispatch({ type: messageActionTypes.SET_SHOW_FALSE }), 3000);
        }
    } catch (err) {
        console.log(err.message)
    }
}

export const deleteFlightOrder = (id) => async (dispatch) => {
    try {
        const response = await $authHost.delete(`api/flightOrder/${id}`)
        console.log(response);
        if (response.data.status == 200) {
            dispatch({ type: messageActionTypes.SET_SHOW_TRUE, payload: "успішно виконано" });
            setTimeout(() => dispatch({ type: messageActionTypes.SET_SHOW_FALSE }), 3000);
            dispatch({ type: flightOrdersActionTypes.FETCH_DELETE_ORDER, payload: response.data.res })
        } else {
            dispatch({ type: messageActionTypes.SET_SHOW_TRUE, payload: "error" });
            setTimeout(() => dispatch({ type: messageActionTypes.SET_SHOW_FALSE }), 3000);
        }
    } catch (err) {
        console.log(err.message)
    }
}

export const getUserHistory = () => async (dispatch) => {
    try {
        const resp = await $authHost.get("api/flightOrder/getUserHistory");
        if (resp.data.status == 200) {
            dispatch({ type: flightOrdersActionTypes.GET_HISTORY_USER, payload: resp.data.res });
        }
    } catch (err) {
        console.log(err);
    }
}

export const fetchGetFlightAccountOrders = () => async (dispatch) => {
    console.log('Yes')
    try {
        const response = await $authHost.get("api/flightOrder/getOrdersAccount")
        if (response.data.status == 200) {
            dispatch({ type: flightOrdersActionTypes.FETCH_GET_FLIGHT_ACCOUNT_ORDER, payload: response.data.flightOrders });
        }
    } catch (err) {
        console.log(err)
    }
}