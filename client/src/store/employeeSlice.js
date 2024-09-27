import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    currentUser : null,
    loading : false,
    error : null,
}

const employeeSlice = createSlice({
    name : 'employee',
    initialState,
    reducers : {
        signin : (state,action)=>{
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null
        },
        login : (state,action)=>{
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null
        }
    }
})

export const {signin,login} = employeeSlice.actions;

export default employeeSlice.reducer