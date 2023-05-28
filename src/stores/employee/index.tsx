import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

interface employeeState {
    employeeList: {
        key: number,
        prefix: string,
        firstName: string,
        lastName: string,
        birthDate: Date,
        nationality: string,
        idCardNumber: string,
        gender: string,
        phoneNumber: {
            code: string,
            number: number
        },
        passportNumber: number | null,
        wishSalary: number
    }[],
    empInfo: {
        key: number,
        prefix: string,
        firstName: string,
        lastName: string,
        birthDate: Date,
        nationality: string,
        idCardNumber: string,
        gender: string,
        phoneNumber: {
            code: string,
            number: number
        },
        passportNumber: number | null,
        wishSalary: number
    } | null
}

const initialState: employeeState = {
    employeeList: [],
    empInfo: null
}

export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        loadEmployeeFromLocalStorage: (state) => {
            const employeeListFromlocalStorage: any = localStorage.getItem("employeeList")
            if (employeeListFromlocalStorage !== null) {
                state.employeeList = JSON.parse(employeeListFromlocalStorage)
            }
        },
        addEmployee: (state, action) => {
            const { formData, idCardNumber } = action.payload
            if (state.employeeList.length === 0) {
                state.employeeList = [...state.employeeList, { key: 0, ...formData, idCardNumber }]
            } else {
                const lastKey = Math.max(...state.employeeList.map(obj => obj.key))
                state.employeeList = [...state.employeeList, { key: lastKey + 1, ...formData, idCardNumber }]
            }
            localStorage.setItem("employeeList", JSON.stringify(state.employeeList))
        },
        getEmployeeInfo: (state, action) => {
            state.empInfo = state.employeeList.filter((emp) => (emp.key === action.payload))[0]
        },
        editEmployeeInfo: (state, action) => {
            const { editKey, formData, idCardNumber } = action.payload
            const editState = state.employeeList.map((emp) => {
                if (emp.key === editKey) {
                    return { key: editKey, ...formData, idCardNumber }
                } else {
                    return emp
                }
            })
            state.employeeList = editState
            localStorage.setItem("employeeList", JSON.stringify(state.employeeList))
        },
        deleteAllEmployeeSelect: (state, action) => {
            const keyArr: number[] = action.payload
            let stateUpdate = state.employeeList
            keyArr.map((key) => {
                stateUpdate = stateUpdate.filter((data) => (data.key !== key))
            })
            state.employeeList = stateUpdate
            localStorage.setItem("employeeList", JSON.stringify(state.employeeList))
        },
        clearEmployeeInfo: (state) => {
            state.empInfo = null
        },
        clearEmployeeFromLocalStorage: (state) => {
            localStorage.removeItem("employeeList")
        }
    },
})

export const { loadEmployeeFromLocalStorage, clearEmployeeFromLocalStorage, addEmployee, getEmployeeInfo, editEmployeeInfo, clearEmployeeInfo, deleteAllEmployeeSelect } = employeeSlice.actions
export default employeeSlice.reducer