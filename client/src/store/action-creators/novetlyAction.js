import { $authHost, $host } from "../../http";
import { messageActionTypes } from "../reducers/messageReducer";
import { novetlyActionTypes } from "../reducers/noveltyReducer";

export const GetNovetly=()=>async(dispatch)=>{
    try{
        const resp=await $host.get('api/novetly/');
        if(resp.data.status==200){
            dispatch({type:novetlyActionTypes.FETCH_GET_NOVETLY,payload:resp.data.res});
        }
    }catch(err){
        console.log(err);
    }
}

export const AddNovetly=(ua,ru,image)=>async(dispatch)=>{
    try{
        let formData=new FormData();
        let description=[ua,ru].join("//");
        await formData.append("description",description);
        await formData.append("image",image);
        const resp=await $authHost.post("api/novetly/",formData);
        console.log(resp);
        if(resp.data.status==200){
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"успішно виконано"});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
        }else {
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"error"});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
        }
    }catch(err){
        alert("error")
        console.log(err);
    }
}

export const DelNovetly=(id)=>async(dispatch)=>{
    try{
        const resp=await $authHost.delete("api/novetly/"+id);
        if(resp.data.status=200){
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"успішно виконано"});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
        }else{
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"error"});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
            console.log(resp);
        }
    }catch(err){
        console.log(err);
    }
}