import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const productsPerPage = 10;

// for fetching allproducts count
export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts', async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
});

// paginated products
export const fetchPageProducts = createAsyncThunk('products/fetchPageProducts', async (page) => {  
    //api dont support get products by page so i have to refetch not only pushing the new page products so i am using limit to get products as 10 products per page  
    const limit = page * productsPerPage;
    const response = await axios.get(`https://fakestoreapi.com/products?limit=${limit}`);
    return response.data;
});

export const productsSlice = createSlice(
    {
        name:'products',
        initialState: {
            allProductsCount: null,
            loadedProducts: [],
            sortedProducts:[],
            currentPage: 1,
            sortOption: 'price-asc',
            loading: false,
            error: null
        },
        reducers:{
            setSortOption: (state, action) => {
                state.sortOption = action.payload;
            },
            sortProducts:(state,action)=>{
                let sorted = [...state.loadedProducts];
    
                if (state.sortOption === 'price-asc') {
                    sorted.sort((a, b) => a.price - b.price);
                } else if (state.sortOption === 'price-desc') {
                    sorted.sort((a, b) => b.price - a.price);
                } else if (state.sortOption === 'category') {
                    sorted.sort((a, b) => a.category.localeCompare(b.category));
                }
                state.sortedProducts = sorted;
            },
            loadMoreProducts: (state) => {   
                const maxPages = Math.ceil(state.allProductsCount / productsPerPage);
                if(state.currentPage < maxPages)             
                   state.currentPage += 1;
            }
        },
        extraReducers: (builder) => {
            builder
            .addCase(fetchAllProducts.pending, (state) => { state.loading = true; })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;                
                state.allProductsCount = action.payload.length;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchPageProducts.fulfilled, (state, action) => {
                state.loadedProducts = action.payload;
            });
        }
    }
)

export const { setSortOption, loadMoreProducts,sortProducts } = productsSlice.actions;
export default productsSlice.reducer;

