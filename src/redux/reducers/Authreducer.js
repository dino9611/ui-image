import {AUTH_LOADING,AUTH_SYSTEM_ERROR,USER_LOGIN_SUCCESS} from './../actions/types'


const INITIAL_STATE={
    username:'',
    email:'',
    status:'',
    error:'',
    loading:false
}
export default(state=INITIAL_STATE,action)=>{
    switch (action.type){
        case USER_LOGIN_SUCCESS :
            return {...INITIAL_STATE,...action.payload}
        case AUTH_SYSTEM_ERROR :
            return{...INITIAL_STATE,...action.payload}
        case AUTH_LOADING:
            return {...state,error:'',loading:true}
        default:
            return state  
    }    
}