import {createContext, useContext} from 'react'
import {useQuery} from "@tanstack/react-query";
import {getDepartments} from "../api/departments.js";
import {getEmployees} from "../api/employees.js";
import {getPriorities} from "../api/priorities.js";

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

  const {data: priorities} = useQuery({
    queryKey: ['priorities'],
    queryFn: getPriorities,
  })

  const departmentsList = departments?.map((department) => ({
    value: department.id,
    label: department.name
  })) || []
  const employeesList = employees?.map((employee) => {
    return {
      id: employee.id,
      avatar: employee.avatar,
      value: employee.id,
      label: employee.name + ' ' + employee.surname
    }
  }) || []

  const prioritiesList = priorities?.map((priority) => {
    return {
      id: priority.id,
      icon: priority.icon,
      value: priority.id,
      label: priority.name,
    }
  }) || []
  const defaultPriority = prioritiesList.find(item => item.value === 2) || null

  return (
      <AppContext.Provider value={{
        departmentsList,
        employeesList,
        prioritiesList,
        defaultPriority
      }}>
        {children}
      </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}