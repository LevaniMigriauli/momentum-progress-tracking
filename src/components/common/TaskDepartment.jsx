import './TaskDepartment.scss'
import clsx from 'clsx'
import { departmentClassMap } from '../../constants/taskClassNames.js'

const TaskPriority = ({ taskDepartment, className = '' }) => (
  <span
    className={clsx(
      'department',
      className,
      departmentClassMap[taskDepartment.id],
    )}
  >
    {taskDepartment.name}
  </span>
)

export default TaskPriority
