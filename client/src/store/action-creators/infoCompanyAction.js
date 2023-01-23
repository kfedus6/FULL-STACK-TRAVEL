import { $authHost, $host } from "../../http"
import { infoCompanyActionTypes } from "../reducers/infoCompanyReducer";
import { messageActionTypes } from "../reducers/messageReducer";

export const GetInfoCompany=()=>async(dispatch)=>{
    try{
        const resp=await $host.get("api/infoCompany/get");
        if(resp.data.status==200){
            dispatch({type:infoCompanyActionTypes.FETCH_GET_INFO_COMPANY,payload:resp.data.infoCompany});
        }
    }catch(err){
        console.log(err);
    }
}

export const SetInfoCompany=(name,email,phone,addressUA,addressRU,openingHoursUA,openingHoursRU,telegram,viber)=>async(dispatch)=>{
    try{
        const resp=await $authHost.put("api/infoCompany/update",{name,email,phone,addressUA,addressRU
        ,openingHoursUA,openingHoursRU,telegram,viber});
        if(resp.data.status==200){
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"успішно виконано"});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
        }else {
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"error"});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
        }
    }catch(err){
        console.log(err);
    }
}