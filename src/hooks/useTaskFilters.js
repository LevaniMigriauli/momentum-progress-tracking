import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTasks } from '../api/tasks.js'

const initialState = {
  departments: [],
  priorities: [],
  employee: []
}

const useTaskFilters = () => {
  const [selectedOptions, setSelectedOptions] = useState(initialState)

  const { data: tasksList } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks
  })

  const filtered =
    useMemo(() => {
      if (!tasksList) return []
      if (Object.entries(selectedOptions).
        every((property) => property[1].length === 0)) return tasksList

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
    filtered
  }
}

export default useTaskFilters
