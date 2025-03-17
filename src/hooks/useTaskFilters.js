import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTasks } from '../api/tasks.js'
import { hasSelectedOptions } from '../utils/selectors.js'

export const initialState = {
  departments: [],
  priorities: [],
  employee: []
}

const loadSelectedOptions = () => {
  const selectedOptions = localStorage.getItem('selectedOptions')
  return selectedOptions ? JSON.parse(selectedOptions) : initialState
}

const useTaskFilters = () => {
  const [selectedOptions, setSelectedOptions] = useState(loadSelectedOptions())

  useEffect(() => {
    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions))
  }, [selectedOptions])

  const { data: tasksList } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks
  })

  const filteredTasks =
    useMemo(() => {
      if (!hasSelectedOptions(selectedOptions)) return tasksList

      return tasksList?.filter((task) => {
        const matchesDepartment = selectedOptions.departments.length === 0 ||
          selectedOptions.departments.some(
            (department) => department.id === task.department.id)
        const matchesPriority = selectedOptions.priorities.length === 0 ||
          selectedOptions.priorities.some(
            (priority) => priority.id === task.priority.id)
        const matchesEmployee = selectedOptions.employee.length === 0 ||
          selectedOptions.employee.some(
            (employee) => employee.id === task.employee.id)

        return matchesDepartment && matchesPriority && matchesEmployee
      })
    }, [selectedOptions, tasksList]) || []

  return {
    selectedOptions,
    setSelectedOptions,
    filteredTasks
  }
}

export default useTaskFilters
