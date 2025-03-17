import './TasksHome.scss'
import { useAppContext } from '../../context/appContext.jsx'
import ControlledSelect from './ControlledSelect.jsx'
import useTaskFilters, {initialState}  from '../../hooks/useTaskFilters.js'
import { hasSelectedOptions } from '../../utils/selectors.js'

const TasksHome = () => {
  const {
    departmentsList,
    statusesList,
    prioritiesList,
    employeesList
  } = useAppContext()
  const { selectedOptions, setSelectedOptions, filteredTasks } = useTaskFilters()

  const taskByStatus = statusesList?.reduce((acc, status) => {
    acc[status.id] = filteredTasks?.filter(task => task.status.id === status.id)
    return acc
  }, {})

  return (
    <div>
      <h1>დავალებების გვერდი</h1>
      <section className="section-filter">
        <div className={'filter-dropdowns'}>
          <ControlledSelect name={'departments'} label={'დეპარტამენტი'}
                            options={departmentsList}
                            selectedOptions={selectedOptions}
                            setSelectedOptions={setSelectedOptions} isMulti/>
          <ControlledSelect name={'priorities'} label={'პრიორიტეტი'}
                            options={prioritiesList}
                            selectedOptions={selectedOptions}
                            setSelectedOptions={setSelectedOptions} isMulti/>
          <ControlledSelect name={'employee'} label={'თანამშრომელი'}
                            options={employeesList}
                            selectedOptions={selectedOptions}
                            setSelectedOptions={setSelectedOptions}/>
        </div>
        <ul>
          {Object.entries(selectedOptions).map(([key, values]) => {
            return values.map(item => {
              return (
                <li key={item.label}>
                  {item.label}
                  <button
                    onClick={() => setSelectedOptions(prev => ({
                        ...prev,
                        [key]: values.filter(task => task.id !== item.id)
                      })
                    )}>x
                  </button>
                </li>
              )
            })
          })}
          {hasSelectedOptions(selectedOptions) &&
            <button onClick={() => setSelectedOptions(initialState)}>გასუფთავება
            </button>
          }
        </ul>
      </section>
      <div>
        <ul className="tasks-list" style={{ display: 'flex', gap: '100px' }}>
          {statusesList.map(item => {
            return (
              <li key={item.id}>
                {item.name}
                <ul>
                  {taskByStatus[item.id]?.map(task => {

                    return (
                      <div key={task.id}>
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