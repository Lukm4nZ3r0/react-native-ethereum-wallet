import {AsyncStorage} from 'react-native'

const initialState = {
    isLogin:false,
    name:''
}
export default user = (state = initialState, action)=>{
    switch(action.type){
        case 'UPDATE_NAME':
            return{
                ...state,
                name:action.name
            }
        default:
            return state
    }
}