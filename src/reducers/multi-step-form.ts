import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type PersonalInfoField = {
    name: string
    email: string
    phone: string
}

export type PlanField = {
    id: number
    isYearly: boolean
}

type MultiStepForm = {
    personalInfo: PersonalInfoField,
    plan: PlanField,
    addons: number[],
    sequence: number,
    isConfirmed: boolean
}

const initialState: MultiStepForm = {
    personalInfo: {
        name: '',
        email: '',
        phone: ''
    },
    plan: {
        id: 0,
        isYearly: false
    },
    addons: [],
    sequence: 0,
    isConfirmed: false
}

export const counterSlice = createSlice({
    name: 'multiStepForm',
    initialState,
    reducers: {
        setPersonalInfo: (state, actions: PayloadAction<PersonalInfoField>) => {
            state.personalInfo = actions.payload
        },
        setPlan: (state, actions: PayloadAction<PlanField>) => {
            state.plan = actions.payload
        },
        setAddons: (state, actions: PayloadAction<number[]>) => {
            state.addons = actions.payload
        },
        setSequence: (state, actions: PayloadAction<number>) => {
            state.sequence = actions.payload
        },
        next: (state) => {
            state.sequence += 1
        },
        back: (state) => {
            state.sequence -= 1
        },
        confirm: (state) => {
            state.isConfirmed = true
        }
    }
})

export const {
    setPersonalInfo,
    setPlan,
    setAddons,
    setSequence,
    next,
    back,
    confirm
} = counterSlice.actions

export default counterSlice.reducer