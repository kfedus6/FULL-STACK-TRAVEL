import { $authHost, $host } from "../../http"
import { userActionTypes } from "../reducers/userReducer";
import jwtDecode from "jwt-decode"
import { t } from 'i18next'
import { messageActionTypes } from "../reducers/messageReducer";

export const Register = (name, email, telephone, password) => async (dispatch) => {
    try {
        const res = await $host.post('api/user/add', { name, email, telephone, password });
        if (res.data.status == 200) {
            const user = await jwtDecode(res.data.token);
            localStorage.setItem("token", res.data.token);
            dispatch({ type: userActionTypes.AUTHORIZE_USER_SUCCESSFUL, payload: user });
        }
        else dispatch({ type: userActionTypes.REGISTER_USER_ERROR, payload: res.data.status });
    } catch (err) {
        dispatch({ type: userActionTypes.REGISTER_USER, action: 500 });
    }
}

export const Authorize = (email, password) => async (dispatch) => {
    const res = await $host.post("api/user/authorize", { email, password });
    if (res.data.status == 200) {
        const user = await jwtDecode(res.data.token);
        localStorage.setItem("token", res.data.token);
        dispatch({ type: userActionTypes.AUTHORIZE_USER_SUCCESSFUL, payload: user });
    } else if (res.data.status) dispatch({ type: userActionTypes.REGISTER_USER_ERROR, payload: res.data.status });
    else dispatch({ type: userActionTypes.REGISTER_USER_ERROR, payload: 400 });
}

export const IsAuthorize = () => async (dispatch) => {
    let token = localStorage.getItem("token");
    if (token != null) {
        const res = await $host.post("api/user/isAuthorize", { token });
        if (res.data.status == 200) {
            let user = await jwtDecode(res.data.token);
            localStorage.setItem("token", res.data.token);
            dispatch({ type: userActionTypes.AUTHORIZE_USER_SUCCESSFUL, payload: user });
        }
    } else dispatch({ type: userActionTypes.NO_AUTHORIZE });
}

export const ChangePassword = (oldPassword, newPassword, id) => async (dispatch) => {
    try {
        const res = await $authHost.post("api/user/changePassword", { oldPassword, newPassword, id });
        if (res.data.status == 200) {
            dispatch({ type: userActionTypes.REGISTER_USER_ERROR, payload: 200 });
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:t("account.password_changed")});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
            dispatch({type:userActionTypes.SET_IS_PASSWORD_NULL,payload:false})
        }else{
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:t("authorize.invalid_pass")});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
        }
    }catch(err){
        dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"error"});
        setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
        console.log(err);
    }
}

export const EditEmail=(newEmail)=>async(dispatch)=>{
    try{
        const resp=await $authHost.post("api/user/editEmail",{newEmail});
        if(resp.data.status==200){
            const user = await jwtDecode(resp.data.token);
            localStorage.setItem("token", resp.data.token);
            dispatch({ type: userActionTypes.AUTHORIZE_USER_SUCCESSFUL, payload: user });
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"успішно виконано"});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
        }else {
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"error"});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
        }
    }catch(err){
        dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"error"});
        setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
    }
}

export const GetPhone=()=>async(dispatch)=>{
    try{
        const resp=await $authHost.get("api/user/getPhone");
        if(resp.data?.status==200){
            dispatch({type:userActionTypes.GET_PHONE,payload:resp.data.res});
        }else console.log(resp);
    }catch(err){
        console.log(err);
    }
}
export const RegisterWithGoogle=(token)=>async(dispatch)=>{
    try{
        const res = await $host.post('api/user/registerWithGoogle', { token });
        if (res.data.status == 200) {
            const user = await jwtDecode(res.data.token);
            localStorage.setItem("token", res.data.token);
            dispatch({ type: userActionTypes.AUTHORIZE_USER_SUCCESSFUL, payload: user });
        }
        else if(res.data.status==411){
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:t("authorize.you_register")});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),5000);
        }
        else dispatch({ type: userActionTypes.REGISTER_USER_ERROR, payload: res.data.status });
    }catch(err){
        dispatch({ type: userActionTypes.REGISTER_USER, action: 500 });
    }
}
export const LogWithGoogle=(token)=>async(dispatch)=>{
    try{
        const res = await $host.post("api/user/regWithGoogle", { token });
        if (res.data.status == 200) {
            const user = await jwtDecode(res.data.token);
            localStorage.setItem("token", res.data.token);
            dispatch({ type: userActionTypes.AUTHORIZE_USER_SUCCESSFUL, payload: user });
        }
        else if (res.data.status==415){
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:t("authorize.you_not_register")});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),5000);
        } 
        else dispatch({ type: userActionTypes.REGISTER_USER_ERROR, payload: 400 });
    }catch(err){
        dispatch({ type: userActionTypes.REGISTER_USER_ERROR, payload: 400 });
    }
}
export const UpdateInfoForUser=(name,surname,phone)=>async(dispatch)=>{
    try{
        const res=await $authHost.post("api/user/updateInfoForUser",{name,surname,phone});
        if(res.data.status==200){
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:t("message.successfully_added")});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),5000);
            const user = await jwtDecode(res.data.token);
            localStorage.setItem("token", res.data.token);
            dispatch({ type: userActionTypes.AUTHORIZE_USER_SUCCESSFUL, payload: user });
        }else{
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:t("error")});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),5000);
        }
    }catch(err){
        dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"error"});
        setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),5000);
    }
}
export const IsPasswordNull=()=>async(dispatch)=>{
    try{
        const res=await $authHost.post("api/user/isPasswordNull");
        if(res.data.status==200){
            dispatch({type:userActionTypes.SET_IS_PASSWORD_NULL,payload:res.data.res})
        }else console.log(res);
    }catch(err){
        console.log(err);
    }
}
export const ForgotPassword=(email)=>async(dispatch)=>{
    try{
        const res=await $host.post("api/user/forgotPass",{email});
        console.log(res);
        if(res.data.status==200){
            dispatch({type:userActionTypes.SET_IS_EMAIL_TRUE,payload:res.data.reply})
        }else{
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"error"});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),5000);
            console.log(res)
        }
    }catch(err){
        dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"error"});
        setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),5000);
    }
}
export const IsSecretKeyTrue=(key)=>async(dispatch)=>{
    try{
        const res=await $host.post("api/user/isKeyForgotPassTrue",{key});
        if(res.data.status==200){
            dispatch({type:userActionTypes.SET_SECRET_KEY,payload:res.data.res});
        }else{
            console.log(res);
        }
    }catch(err){
        console.log(err)
    }
}
export const ForgorPassTrue=(key,newPassword)=>async(dispatch)=>{
    try{
        const res=await $host.post("api/user/forgotPassTrue",{key,newPass:newPassword});
        if(res.data.status==200){
            dispatch({type:userActionTypes.SET_REPLY,payload:res.data.reply});
        }else{
            console.log(res);
        }
    }catch(err){
        console.log(err);
    }
}