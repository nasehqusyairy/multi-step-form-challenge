import { configureStore } from '@reduxjs/toolkit'
import multiStepForm from '@/reducers/multi-step-form'

export const store = configureStore({
    reducer: { multiStepForm }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch