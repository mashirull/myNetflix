import  {createSlice , createAsyncThunk}   from "@reduxjs/toolkit";
import { app } from "../../../Firebase/firebase";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getUserInfoFromLS } from "../../../lib/getUserInfoFromLS";

const auth = getAuth(app)

interface InitialState {
    isLoading : boolean;
    user :  ()=> null | object[];
    isError : boolean;
    isSuccess : boolean
    
}

const initialState:InitialState = {
    isLoading : false,
    user : getUserInfoFromLS() ,
    isError : false,
    isSuccess : false
    
}


 export const userLogin =  createAsyncThunk('signIn' ,  async({email , password}:any)=> {
   
    let data = null;
    await signInWithEmailAndPassword(auth , email , password)
    .then(user => {
        return data = user
    })

    return data
    
 })

 export const UserRegister = createAsyncThunk('signUp' , async ({email , password}:any)=> {
    let data  =  null;
    await createUserWithEmailAndPassword(auth ,  email , password)
    .then(user => {
        return data = user
    })
   

    return data
 })


const authSlice = createSlice({
    name : 'auth',
    initialState,

    extraReducers : (builder:any):void  => {

        // for user login

        builder.addCase(userLogin.pending , (state:any):void => {
            state.isLoading =  true
            state.isError = false
        });

        builder.addCase(userLogin.fulfilled , (state:any ,  action:any):void => {
            state.isLoading =  false
            state.user = action.payload
            localStorage.setItem('user' , JSON.stringify(state.user))
        });
        
        builder.addCase(userLogin.rejected , (state:any):void => {
            state.isLoading =  false
            state.isError =  true
        });

        //for user register

        builder.addCase(UserRegister.pending , (state:any):void => {
            state.isLoading =  true
            state.isError = false
            state.isSuccess =  false
        });

        builder.addCase(UserRegister.fulfilled , (state:any  , action:any):void => {
            state.isLoading =  false
            state.isSuccess = true

        });
        
        builder.addCase(UserRegister.rejected , (state:any ):void => {
            state.isLoading =  false
            state.isError =  true
            state.isSuccess =  false
        });
    },

    reducers : {
        logout : (state:any)=> {
            localStorage.removeItem('user')
            state.user = null
        }
    }

});

export default authSlice.reducer

export const {logout} = authSlice.actions

