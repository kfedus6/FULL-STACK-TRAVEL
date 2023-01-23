export const aboutUsTypes={
    GET_ABOUT_US:"GET_ABOUT_US",
}

const initialState={
    aboutUs:undefined
}

export const aboutUsReducer=(state=initialState,action)=>{
    switch(action.type){
        case aboutUsTypes.GET_ABOUT_US:{
            return {...state,aboutUs:action.payload}
        }
        default: return state;
    }
}
