import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { changeTaskStatus, retrieveTask } from '../api/tasks.js'
import Select from '../components/ui/Select.jsx'
import { useAppContext } from '../context/appContext.jsx'

const TaskDetails = () => {
  const location = useLocation()
  const { statusesList } = useAppContext()
  const [taskStatus, setTaskStatus] = useState(null)

  const taskId = +location.pathname.split('/').at(-1)
  const isValidTaskId = !isNaN(taskId) && taskId > 0

  const { data: taskDetails } = useQuery({
    queryKey: ['TaskDetails'],
    queryFn: () => retrieveTask(taskId),
    enabled: isValidTaskId,
  })

  const mutateStatus = useMutation({
    mutationFn: ({ id, statusBody }) => changeTaskStatus(id, statusBody),
  })

  useEffect(() => {
    if (taskDetails && statusesList?.length) {
      setTaskStatus(
        statusesList.find(
          (taskStatus) => taskStatus.id === taskDetails.status?.id,
        ),
      )
    }
  }, [taskDetails, statusesList])

  const handleStatusChange = (selectedOption) => {
    setTaskStatus(selectedOption)
    mutateStatus.mutate({
      id: taskId,
      statusBody: { status_id: selectedOption.id },
    })
  }

  return (
    <div>
      <h1>Task Details</h1>
      <Select
        name={'priorities'}
        options={statusesList}
        value={taskStatus}
        onChange={handleStatusChange}
      />
    </div>
  )
}

export default TaskDetails
