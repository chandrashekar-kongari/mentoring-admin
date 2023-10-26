import {createSlice,nanoid} from '@reduxjs/toolkit'

const initialState={

    ids:[],
    mentors:[],
    mentees:[]

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
        }
    }    
})

export const {saveIds,saveMentees,saveMentors} =appSlice.actions
export default appSlice.reducer