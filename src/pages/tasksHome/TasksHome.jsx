import './TasksHome.scss'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { useAppContext } from '../../context/appContext.jsx'
import useTaskFilters, { initialState } from '../../hooks/useTaskFilters.js'
import { hasSelectedOptions } from '../../utils/selectors.js'
import { georgianMonths } from '../../constants/dates.js'
import { statusClassMap } from '../../constants/taskClassNames.js'
import ControlledSelect from './ControlledSelect.jsx'
import Icon from '../../components/common/Icon.jsx'
import TaskPriority from '../../components/common/TaskPriority.jsx'
import TaskDepartment from '../../components/common/TaskDepartment.jsx'

const TasksHome = () => {
  const navigate = useNavigate()
  const { departmentsList, statusesList, prioritiesList, employeesList } =
    useAppContext()
  const { selectedOptions, setSelectedOptions, filteredTasks } =
    useTaskFilters()

  const taskByStatus = statusesList?.reduce((acc, status) => {
    acc[status.id] = filteredTasks?.filter(
      (task) => task.status.id === status.id,
    )
    return acc
  }, {})

  return (
    <div className={'tasks-home'}>
      <h1 className={'header-main'}>დავალებების გვერდი</h1>
      <section className="section-filter">
        <div className={'filter-dropdowns'}>
          <ControlledSelect
            name={'departments'}
            label={'დეპარტამენტი'}
            options={departmentsList}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            isMulti
          />
          <ControlledSelect
            name={'priorities'}
            label={'პრიორიტეტი'}
            options={prioritiesList}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            isMulti
          />
          <ControlledSelect
            name={'employee'}
            label={'თანამშრომელი'}
            options={employeesList}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            isMulti={false}
          />
        </div>
        <ul className={'selected-task-list'}>
          {Object.entries(selectedOptions).map(([key, values]) => {
            return values.map((item) => {
              return (
                <li key={item.label} className={'selected-task-list__item'}>
                  {item.label}
                  <button
                    className={'btn-delete-task'}
                    onClick={() =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [key]: values.filter((task) => task.id !== item.id),
                      }))
                    }
                  >
                    <Icon name={'x'} viewBox={'0 0 14 14'} />
                  </button>
                </li>
              )
            })
          })}
          {hasSelectedOptions(selectedOptions) && (
            <button
              className={'btn-clear-selected-tasks'}
              onClick={() => setSelectedOptions(initialState)}
            >
              გასუფთავება
            </button>
          )}
        </ul>
      </section>
      <section className={'section-tasks'}>
        <ul className="priorities-list">
          {statusesList.map(({ id, name }) => {
            return (
              <ol key={id} className={'priorities-list-item'}>
                <h3 className={clsx('priority', statusClassMap[id])}>{name}</h3>
                <li className="tasks-list">
                  {taskByStatus[id].map((task) => {
                    const descriptionToShow =
                      task.description?.length > 75
                        ? task.description.slice(0, 75) + '...'
                        : task.description

                    const dueDate = task.due_date.split('T')[0].split('-')
                    const year = dueDate[0]
                    const month = dueDate[1]
                    const day = dueDate[2]

                    const dueDateFormatted = `${day} ${georgianMonths[Number(month)]}, ${year}`

                    return (
                      <div
                        key={task.id}
                        className={clsx('tasks-list-card', statusClassMap[id])}
                        onClick={() => navigate(`/task-details/${task.id}`)}
                      >
                        <div className={'tasks-list-card__header'}>
                          <div className={'header-layout'}>
                            <TaskPriority taskPriority={task.priority} />
                            <TaskDepartment taskDepartment={task.department} />
                          </div>
                          <span>{dueDateFormatted}</span>
                        </div>
                        <div className={'tasks-list-card__text'}>
                          <h5>{task.name}</h5>
                          <p>{descriptionToShow}</p>
                        </div>
                        <div>
                          <span className={'tasks-list-card__footer'}>
                            <img
                              src={task.employee.avatar}
                              alt={`${task.employee.first_name} image`}
                            />
                            <span className={'tasks-list-card__footer-comment'}>
                              <Icon name={'comment'} viewBox={'0 0 22 22'} />
                              <span>{task.total_comments}</span>
                            </span>
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </li>
              </ol>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export default TasksHome
