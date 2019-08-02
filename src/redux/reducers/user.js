import {AsyncStorage} from 'react-native'

const initialState = {
    isLogin:false,
    isLoading:false,
    primaryAddress:'',
    primaryAddressAmount:'',
    primaryAddressPrice:0,
    percentagePrice:0,
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
        case 'UPDATE_PRICE':
            return{
                ...state,
                primaryAddressPrice:action.price
            }
        case 'UPDATE_PERCENTAGE_PRICE':
            return{
                ...state,
                percentagePrice:action.price
            }
        case 'ADD_PRIMARY_ADDRESS':
            return{
                ...state,
                isLogin:true,
                primaryAddress:action.address,
                primaryAddressAmount:action.ethAmount
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
                isLogin:false,
                otherAddress:[]
            }
        default:
            return state
    }
}