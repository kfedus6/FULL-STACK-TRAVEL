import { $host } from "../../http";
import { aboutUsTypes } from "../reducers/aboutUsReducer";
import { messageActionTypes } from "../reducers/messageReducer";

export const GetAboutUs=()=>async(dispatch)=>{
    try{
        let resp=await $host.get("api/aboutUs/get");
        if(resp.data.status==200){
            resp.data.res.description=resp.data.res.description.split("//");
            dispatch({type:aboutUsTypes.GET_ABOUT_US,payload:resp.data.res})
        }

    }catch(err){
        console.log(err);
    }
}

export const SetAboutUs=(ua,ru)=>async(dispatch)=>{
    try{
        const resp=await $host.put("api/aboutUs/update",{ua,ru});
        if(resp.data.status==200){
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"успішно виконано"});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
            GetAboutUs()(dispatch);
        }else {
            
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"error"});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
        }

    }catch(err){
        console.log(err);
    }
}