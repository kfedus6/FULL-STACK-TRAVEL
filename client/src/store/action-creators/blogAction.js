import { t } from "i18next";
import { $authHost, $host } from "../../http";
import { blogActionTypes } from "../reducers/blogReducer";
import { messageActionTypes } from "../reducers/messageReducer";


export const GetBlogNovetly=(count)=>async(dispatch)=>{
    try{
        const resp=await $host.get("api/blog/getNovetly",{params:{count}});
        if(resp.data.status==200){
            dispatch({type:blogActionTypes.FETCH_GET_BLOG_NOVETLY,payload:resp.data.res});
        }
    }catch(err){
        console.log(err);
    }
}

export const GetBlogAll=(page,limit)=>async(dispatch)=>{
    try{
        const resp=await $host.get("api/blog/getAll",{params:{page,limit}});
        if(resp.data.status==200){
            dispatch({type:blogActionTypes.FETCH_GET_ALL_BLOG,payload:{page,limit,listBlog:resp.data.res,count:resp.data.count}})
        }
    }catch(err){
        console.log(err);
    }
}

export const GetBlogDescription=(id)=>async(dispatch)=>{
    try{
        const resp=await $host.get("api/blog/getDescription?id="+parseInt(id));
        if(resp.data.status==200){
            dispatch({type:blogActionTypes.FETCH_GET_DESCRIPTION,payload:{selectBlog:resp.data.res,blogRetaledFlight:resp.data.blogRetaledFlight}});
        }else console.log(resp);
    }catch(err){
        console.log(err);
    }
}

export const AddBlog=(descriptionUa,descriptionRu,image,name,miniDescription,listFlight)=>async(dispatch)=>{
    try{
        let formData=new FormData();
        await formData.append("image",image);
        await formData.append("descriptionUa",descriptionUa);
        await formData.append("descriptionRu",descriptionRu);
        await formData.append("name",name);
        await formData.append("miniDescription",miniDescription);
        await formData.append("listFlight",JSON.stringify(listFlight));
        const resp=await $authHost.post("api/blog/add",formData);
        if(resp.data.status==200){
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:t("message.successfully_added")});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
        }else {
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"error"});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
            console.log(resp);
        }
    }catch(err){
        dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"error"});
        setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
        console.log(err);
    }
}

export const DelBlog=(id)=>async(dispatch)=>{
    try{
        const resp=await $authHost.delete("api/blog/del",{data:{id}});
        if(resp.data.status==200){
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"успішно видалено"});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
        }else {
            dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"error"});
            setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
            console.log(resp);
        }
    }catch(err){
        dispatch({type:messageActionTypes.SET_SHOW_TRUE,payload:"error"});
        setTimeout(()=>dispatch({type:messageActionTypes.SET_SHOW_FALSE}),3000);
        console.log(err);
    }
}

export const GetSimilarBlog=(id)=>async(dispatch)=>{
    try{
        const resp=await $host.get("api/blog/getSimilar?id="+id);
        if(resp.data.status==200){
            dispatch({type:blogActionTypes.FETCH_GET_SIMILAR,payload:resp.data.res});
        }else console.log(resp);
    }catch(err){
        console.log(err);
    }
}