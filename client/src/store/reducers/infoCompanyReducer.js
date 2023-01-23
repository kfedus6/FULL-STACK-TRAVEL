export const infoCompanyActionTypes={
    FETCH_GET_INFO_COMPANY:"FETCH_GET_INFO_COMPANY"
}

const initialState={
    infoCompany:undefined
}

export const infoCompanyReducer=(state=initialState,action)=>{
    switch(action.type){
        case infoCompanyActionTypes.FETCH_GET_INFO_COMPANY:{
            return {...state,infoCompany:action.payload};
        }
        default: return state;
    }
}