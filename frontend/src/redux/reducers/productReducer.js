import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axios from "axios";
//import { act } from "react";

const initialState={
    productList:[]
};

export const getInitialStateAsync=createAsyncThunk(
    "todo/getInitialState",
   async ()=>{
    try{
       return await axios.get("http://localhost:8000/api/getProducts");
    }catch(error){
        console.log("error:",error);
    }
    }
)

//CAT to create product.
export const addProductAsync=createAsyncThunk(
    "product/addProduct",
    async (payload)=>{
        const response=await fetch("http://localhost:8000/api/createProduct",{
            method:'post',
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(payload)
        });
        return response.json
    }
)
//CAT to update product.
export const updateProductAsync=createAsyncThunk(
    "product/updateProduct",
     async(payload)=>{
       // console.log("updating payload:",payload.selectedProductId)
        const { selectedProductId, formData } = payload; // Destructure payload
        const response=await fetch(`http://localhost:8000/api/updateProduct/${selectedProductId}`,{
            method:"PUT",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(formData)
        })
        return response.json();
     }


)

//Reducers using redux toolkit.
const productSlice=createSlice({
    name:'product',
    initialState:initialState,
    reducers:{
       
    },
    //Extra reducers to catch promise.
    extraReducers:(builder)=>{
        builder.addCase(getInitialStateAsync.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.productList=[...action.payload.data.message]
        })
        .addCase(addProductAsync.fulfilled,(state,action)=>{
            console.log("Product:",action.payload);
            //state.productList.unshift(action.payload);
            state.productList = [...state.productList, action.payload];

        })
        .addCase(updateProductAsync.fulfilled,(state,action)=>{
            console.log("action payload:",action.payload);
            const index = state.productList.findIndex(product => product._id === action.payload._id);
                // If the product is found, update it in the productList array
                if (index !== -1) {
                    state.productList[index] = action.payload;
                }
            });
    }
})

//exporting productReducers to use it in store.
export const productReducer=productSlice.reducer;

//exporting product Action.
export const productAction=productSlice.actions;

//Using Selector here and then exporting it.
export const productSelector=(state)=>state.productReducer.productList;