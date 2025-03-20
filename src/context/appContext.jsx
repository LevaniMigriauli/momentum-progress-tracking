import { createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getDepartments } from '../api/departments.js'
import { getEmployees } from '../api/employees.js'
import { getPriorities } from '../api/priorities.js'
import { getStatuses } from '../api/statuses.js'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const { data: departments } = useQuery({
    queryKey: ['department'],
    queryFn: getDepartments,
  })

  const { data: employees } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees,
  })

  const { data: priorities } = useQuery({
    queryKey: ['priorities'],
    queryFn: getPriorities,
  })

  const { data: statuses } = useQuery({
    queryKey: ['statuses'],
    queryFn: getStatuses,
  })

  const departmentsList =
    departments?.map((department) => ({
      id: department.id,
      value: department.id,
      label: department.name,
    })) || []
  const employeesList =
    employees?.map((employee) => {
      return {
        id: employee.id,
        avatar: employee.avatar,
        value: employee.id,
        label: employee.name + ' ' + employee.surname,
        department: employee.department,
      }
    }) || []

  const prioritiesList =
    priorities?.map((priority) => {
      return {
        id: priority.id,
        icon: priority.icon,
        value: priority.id,
        label: priority.name,
      }
    }) || []
  const defaultPriority =
    prioritiesList.find((item) => item.value === 2) || null

  const statusesList =
    statuses?.map((status) => ({
      id: status.id,
      name: status.name,
      value: status.id,
      label: status.name,
    })) || []

  return (
    <AppContext.Provider
      value={{
        departmentsList,
        employeesList,
        prioritiesList,
        defaultPriority,
        statusesList,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
