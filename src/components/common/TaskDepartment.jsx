import './TaskDepartment.scss'
import clsx from 'clsx'
import { departmentClassMap } from '../../constants/taskClassNames.js'

const TaskPriority = ({ taskDepartment, className = '' }) => (
  <span
    className={clsx(
      'department',
      className,
      departmentClassMap[taskDepartment.id] || 'default-background',
    )}
  >
    {taskDepartment.name}
  </span>
)

export default TaskPriority
