
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

export const cartSlice= createSlice({
    name: 'cart',
    initialState: {
        cartItems:[],
        isCartOpen:false
    },
    reducers:{
        changeCartStatus: (state) => {
            state.isCartOpen = !state.isCartOpen;
          },
        addToCart: (state,action)=>{ //payload is the whole product
            const item = {...action.payload};
            const existingItem = state.cartItems.find((i) => i.id === item.id);
            if (existingItem) {
                state.isCartOpen = true; //if item is already in cart, open cart
                toast.success('Product already in cart!')
            }
            else{
                item.quantity=1
                state.cartItems.push(item);
                toast.success('Product added to cart')
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            toast.success('Cart cleared successfully!')
            localStorage.removeItem("cartItems")
        },
        updateQuantity: (state, action) => { // payload is the id and newQuantity
            const {id, newQuantity} = action.payload
            const item = state.cartItems.find((i) => i.id === id);
            if (item) {
                if(newQuantity == 0){
                    state.cartItems = state.cartItems.filter((item) => item.id !== id); 
                    toast.success('Product removed from cart!')
                }else{
                    item.quantity = newQuantity;
                }
            }
        }
    },
})
export const { changeCartStatus , addToCart, clearCart, updateQuantity} = cartSlice.actions;
export const selectIsCartEmpty = (state) => state.cart?.cartItems?.length === 0;
export const selectCartTotal = (state) =>
    state.cart.cartItems.reduce(
      (total, item) => total + item.price * item.quantity
      ,0).toFixed(3);
export default cartSlice.reducer;

