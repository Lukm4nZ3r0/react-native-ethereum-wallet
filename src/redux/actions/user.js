import axios from 'axios'
import URL from '../../../URL'

export const updateName = (name) => {
    return{
        type: 'UPDATE_NAME',
        name
    }
}
export const addPrimaryAddress = (address) =>{
    return{
        type:'ADD_PRIMARY_ADDRESS',
        address
    }
}
export const addAddress = (address) => {
    return{
        type: 'ADD_ADDRESS',
        address
    }
}
export const logout = () =>{
    return{
        type: 'LOGOUT',
    }
}
