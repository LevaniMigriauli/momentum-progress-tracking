import {createContext, useContext} from 'react'
import {useQuery} from "@tanstack/react-query";
import {getDepartments} from "../api/departments.js";
import {getEmployees} from "../api/employees.js";

const AppContext = createContext()

export const AppProvider = ({children}) => {

  const {data: departments} = useQuery({
    queryKey: ['department'],
    queryFn: getDepartments,
  })

  const {data: employeesList} = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees,
  })

  const departmentsList = departments?.map((department) => ({
    value: department.id,
    label: department.name
  }))

  return (
      <AppContext.Provider value={{
        departmentsList,
        employeesList
      }}>
        {children}
      </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}