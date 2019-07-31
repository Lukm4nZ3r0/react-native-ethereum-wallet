import axios from 'axios'
import URL from '../../../URL'

export const updateName = (name) => {
    return{
        type: 'UPDATE_NAME',
        name
    }
}
