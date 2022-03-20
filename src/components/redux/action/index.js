import { ADD_ITEM, DEL_ITEM } from "../../../constants"

export const addCart =(product)=>{
    return {
        type: ADD_ITEM,
        payload: product
    }
}
export const delCart =(product)=>{
    return {
        type: DEL_ITEM,
        payload: product
    }
}