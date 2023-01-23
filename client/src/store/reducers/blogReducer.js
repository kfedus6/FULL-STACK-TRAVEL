export const blogActionTypes={
    FETCH_GET_ALL_BLOG:"FETCH_GET_ALL_BLOG",
    FETCH_GET_BLOG_NOVETLY:"FETCH_GET_BLOG_NOVETLY",
    FETCH_GET_DESCRIPTION:"FETCH_GET_DESCRIPTION",
    FETCH_GET_SIMILAR:"FETCH_GET_SIMILAR"
}

const initialState={
    listBlog:undefined,
    page:1,
    limit:12,
    selectBlog:undefined,
    blogNovetly:[],
    countBlog:0,
    similarBlog:undefined,
    blogRetaledFlight:[]
};

export const blogReducer=(state=initialState,action)=>{
    switch(action.type){
        case blogActionTypes.FETCH_GET_ALL_BLOG:{
            return {...state,page:action.payload.page,limit:action.payload.limit,listBlog:action.payload.listBlog,countBlog:action.payload.count};
        }
        case blogActionTypes.FETCH_GET_BLOG_NOVETLY:{
            return {...state,blogNovetly:action.payload};
        }
        case blogActionTypes.FETCH_GET_DESCRIPTION:{
            return {...state,selectBlog:action.payload.selectBlog,blogRetaledFlight:action.payload.blogRetaledFlight};
        }
        case blogActionTypes.FETCH_GET_SIMILAR:{
            return {...state,similarBlog:action.payload};
        }
        default: return state;
    }
}