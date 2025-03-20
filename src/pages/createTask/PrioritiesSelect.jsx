import { useAppContext } from '../../context/appContext.jsx'
import Select from '../../components/ui/Select.jsx'
import { components } from 'react-select'

const prioritiesListOptionRenderer = (props) => {
  const { data } = props

  return (
    <components.Option
      {...props}
      className={`custom-option ${data.isCustom ? 'add-employee' : ''}`}
    >
      {data.icon && (
        <img src={data.icon} alt={data.label} className="icon-priority" />
      )}
      {data.label}
    </components.Option>
  )
}

const singleValue = (props) => {
  const { data } = props

  return (
    <components.SingleValue {...props} className={'custom-option'}>
      <img src={data.icon} alt={data.label} />
      {data.label}
    </components.SingleValue>
  )
}

const EmployeesSelect = ({
  name: filedName,
  label,
  control,
  errors,
  rules,
  isRequired,
  isDisabled,
}) => {
  const { prioritiesList } = useAppContext()

  return (
    <Select
      control={control}
      name={filedName}
      label={label}
      isRequired={isRequired}
      errors={errors}
      rules={rules}
      options={prioritiesList}
      isDisabled={isDisabled}
      optionRenderer={prioritiesListOptionRenderer}
      singleValue={singleValue}
    />
  )
}

export default EmployeesSelect
