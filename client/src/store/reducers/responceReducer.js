export const responceActionTypes={
    FETCH_GET_NOVETLY_RESPONCE: 'FETCH_GET_NOVETLY_RESPONCE',
    FETCH_GET_RESPONCE: 'FETCH_GET_RESPONCE'
}

const initialState={
    novetlyResponce:undefined,
    allResponce:undefined,
    page:1,
    limit:10
}

export const responceReducer=(state=initialState,action)=>{
    switch(action.type){
        case responceActionTypes.FETCH_GET_RESPONCE:{
            return {...state,page:action.payload.page,allNovetly:action.payload.allResponce};
        }
        case responceActionTypes.FETCH_GET_NOVETLY_RESPONCE:{
            return {...state,novetlyResponce:action.payload};
        }
        default: return state;
    }
}