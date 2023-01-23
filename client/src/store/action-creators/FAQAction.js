import { $authHost, $host } from "../../http";
import { FAQActionTypes } from "../reducers/FAQReducer";
import { messageActionTypes } from "../reducers/messageReducer";

export const GetFAQ = (page, limit) => async (dispatch) => {
    try {
        const resp = await $host.get("api/FAQ/get");
        if (resp.data.status == 200) {
            dispatch({ type: FAQActionTypes.FAQ_GET, payload: { res: resp.data.res, page: page, limit: limit, count: resp.data.count } });
        }
    } catch (err) {
        console.log(err);
    }
}

export const GetFAQNovetly = (limit) => async (dispatch) => {
    try {
        const resp = await $host.get("api/FAQ/getNovetly", { limit });
        if (resp.data.status == 200) {
            dispatch({ type: FAQActionTypes.FAQ_NOVETLY_GET, payload: resp.data.res });
        }
    } catch (err) {
        console.log(err);
    }
}
export const GetFAQSelect = (id) => async (dispatch) => {
    try {
        const resp = await $host.get("api/FAQ/getSelect?id=" + parseInt(id));
        if (resp.data.status == 200) {
            dispatch({ type: FAQActionTypes.FAQ_SELECT_FAQ, payload: resp.data.res });
        } else console.log(resp);
    } catch (err) {
        console.log(err);
    }
}

export const deleteFAQ = (id) => async (dispatch) => {
    try {
        const resp = await $authHost.delete(`api/FAQ/${id}`);
        if (resp.data.status == 200) {
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"успішно виконано"});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
            dispatch({ type: FAQActionTypes.DELETE_SELECT_FAQ, payload: resp.data.res });
        } else {
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"error"});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
            console.log(resp);
        }
    } catch (err) {
        console.log(err);
    }
}


export const AddFAQ = (desriptionUa, desriptionRu, nameUa, nameRu) => async (dispatch) => {
    try {
        const description = [desriptionUa, desriptionRu].join("//");
        const name = [nameUa, nameRu].join("//");
        const resp = await $authHost.post("api/FAQ/add", { name, description });
        if (resp.status == 200) {
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"успішно виконано"});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
        } else {
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"error"});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
        }
    } catch (err) {
        dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"error"});
        setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
        console.log(err);
    }
}