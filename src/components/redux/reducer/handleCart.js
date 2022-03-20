import { ADD_ITEM, DEL_ITEM } from "../../../constants";

const cart = [];
const handleCart = (state=cart, action)=>{
    const product = action.payload;
    switch (action.type) {
        case ADD_ITEM:
            const exist=state.find(x=>x.id===product.id);
            if(exist){
                return state.map(x=>x.id===product.id?{...x,qty:x.qty+1}:x);
            }
            else{
                return [...state,{...product,qty:1}];
            }
            break;
        case DEL_ITEM:
            const exist1=state.find(x=>x.id===product.id);
            if(exist1.qty===1){
                return state.filter(x=>x.id!==exist1.id);
            }
            else{
                return state.map(x=>x.id===product.id?{...x,qty:x.qty-1}:x);
            }
            break;
        default:
            return state;
            break;
    }
}
export default handleCart;