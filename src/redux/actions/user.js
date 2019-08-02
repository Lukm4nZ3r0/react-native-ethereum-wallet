export const updateName = (name) => {
    return{
        type: 'UPDATE_NAME',
        name
    }
}
export const updatePrice = (price) =>{
    return{
        type: 'UPDATE_PRICE',
        price
    }
}
export const updatePercentagePrice = (price) =>{
    return{
        type: 'UPDATE_PERCENTAGE_PRICE',
        price
    }
}
export const addPrimaryAddress = (address,ethAmount) =>{
    return{
        type:'ADD_PRIMARY_ADDRESS',
        address,
        ethAmount
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
