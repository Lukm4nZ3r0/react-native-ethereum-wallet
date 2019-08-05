import {AsyncStorage} from 'react-native'

const initialState = {
    isLogin:false,
    isLoading:false,
    primaryAddress:'',
    primaryAddressAmount:'',
    primaryAddressPrice:0,
    percentagePrice:0,
    historyTransaction:[],
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
                otherAddress:[...state.otherAddress, {ethAddress:action.address}]
            }
        case 'DELETE_ADDRESS':
            return{
                ...state,
                otherAddress:[]
            }
        case 'DELETE_ADDRESS_WHERE':
            let newOtherAddress = state.otherAddress
            for(let i = 0 ; i<state.otherAddress.length ; i++){
                if(state.otherAddress[i].ethAddress === action.address){
                    newOtherAddress.splice(i,1)
                }
            }
            return{
                ...state,
                otherAddress:newOtherAddress
            }
        case 'UPDATE_HISTORY_TRANSACTION':
            return{
                ...state,
                historyTransaction:action.data
            }
        case 'DELETE_ALL_HISTORY':
            return{
                ...state,
                historyTransaction:[]
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