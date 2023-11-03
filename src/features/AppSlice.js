import {createSlice,nanoid} from '@reduxjs/toolkit'

const initialState={

    ids:[],
    mentors:[],
    mentees:[],
    resid:''

}

export const appSlice=createSlice({
    name:'app',
    initialState,
    reducers:{
        saveIds:(state,action)=>{
            const val=action.payload
            state.ids=val
        },
        saveMentors:(state,action)=>{
            const val=action.payload
            state.mentors=val
        },
        saveMentees:(state,action)=>{
            const val=action.payload
            state.mentees=val
        },
        saveResid:(state,action)=>{
            const val=action.payload
            state.resid=val
        }
    }    
})

export const {saveIds,saveMentees,saveMentors,saveResid} =appSlice.actions
export default appSlice.reducer