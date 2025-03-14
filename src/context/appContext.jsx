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

  const {data: employees} = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees,
  })

  const departmentsList = departments?.map((department) => ({
    value: department.id,
    label: department.name
  })) || []
  const employeesList = employees?.map((employee) => {
    console.log(employee)
    return {
      avatar: employee.avatar,
      value: employee.id,
      label: employee.name + ' ' + employee.surname
    }
  }) || []

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