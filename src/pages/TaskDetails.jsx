import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { retrieveTask } from '../api/tasks.js'
import Select from '../components/ui/Select.jsx'
import { useAppContext } from '../context/appContext.jsx'

const TaskDetails = () => {
  const location = useLocation()
  const { statusesList } = useAppContext()
  const [taskStatus, setTaskStatus] = useState(null)

  const taskId = location.pathname.split('/').at(-1)
  const { data: taskDetails } = useQuery({
    queryKey: ['TaskDetails'],
    queryFn: () => retrieveTask(taskId),
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

  return (
    <div>
      <h1>Task Details</h1>
      <Select
        name={'priorities'}
        options={statusesList}
        value={taskStatus}
        onChange={(selectedOption) => setTaskStatus(selectedOption)}
      />
    </div>
  )
}

export default TaskDetails
