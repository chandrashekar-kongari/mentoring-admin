import {configureStore} from "@reduxjs/toolkit"
import appReducer from '../features/AppSlice'
 const store=configureStore({
     reducer:appReducer

})
export default store