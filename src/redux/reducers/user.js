import {AsyncStorage} from 'react-native'

const initialState = {
    isLogin:false,
    isLoading:false,
    primaryAddress:'',
    otherAddress:[],
    name:''
}
export default user = (state = initialState, action)=>{
    switch(action.type){
        case 'UPDATE_NAME':
            return{
                ...state,
                name:action.name
            }
        case 'ADD_PRIMARY_ADDRESS':
            return{
                ...state,
                primaryAddress:action.address
            }
        case 'ADD_ADDRESS':
            return{
                ...state,
                otherAddress:[...state.otherAddress, ...action.address]
            }
        case 'LOGOUT':
            return{
                ...state,
                primaryAddress:'',
                otherAddress:[]
            }
        default:
            return state
    }
}