import './TasksHome.scss'
import { useAppContext } from '../../context/appContext.jsx'
import ControlledSelect from './ControlledSelect.jsx'
import useTaskFilters, { initialState } from '../../hooks/useTaskFilters.js'
import { hasSelectedOptions } from '../../utils/selectors.js'
import { useNavigate } from 'react-router-dom'
import Icon from '../../components/common/Icon.jsx'

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
      <div className={'tasks-container'}>
        <ul
          className="priorities-list"
          style={{ display: 'flex', gap: '100px' }}
        >
          {statusesList.map((item) => {
            return (
              <li key={item.id} className={'priorities-list-item'}>
                {item.name}
                <ul className="tasks-list">
                  {taskByStatus[item.id]?.map((task) => {
                    return (
                      <div
                        key={task.id}
                        className={'tasks-list-card'}
                        onClick={() => navigate(`/task-details/${task.id}`)}
                      >
                        {task.name}
                      </div>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default TasksHome
