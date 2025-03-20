import './TaskPriority.scss'
import clsx from 'clsx'
import { priorityClassMap } from '../../constants/taskClassNames.js'

const TaskPriority = ({ taskPriority, className = '' }) => (
  <span
    className={clsx(
      'task-priority',
      className,
      priorityClassMap[taskPriority.id],
    )}
  >
    <img src={taskPriority.icon} alt={`${taskPriority.name} icon`} />
    {taskPriority.name}
  </span>
)

export default TaskPriority
