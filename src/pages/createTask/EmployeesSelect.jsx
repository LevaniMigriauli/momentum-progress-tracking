import Select from '../../components/ui/Select.jsx'
import { components } from 'react-select'

const employeesListOptionRenderer = (props) => {
  const { data, selectOption, innerRef, innerProps } = props

  // console.log(props)
  const handleClick = (event) => {
    event.stopPropagation()

    if (data.isCustom) {
      data.onCustomClick()
      // selectOption(null);
    } else {
      selectOption(data)
    }
  }

  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`custom-option ${data.isCustom ? 'add-employee' : ''}`}
      onClick={handleClick}
    >
      {data.avatar && (
        <img src={data.avatar} alt={data.label} className="option-avatar" />
      )}
      {data.label}
    </div>
  )
}

const singleValue = (props) => {
  const { data } = props
  return (
    <components.SingleValue {...props}>
      {data.avatar && <img src={data.avatar} alt={data.label} />}
      {data.label}
    </components.SingleValue>
  )
}

const EmployeesSelect = ({
  name: fieldName,
  label,
  control,
  errors,
  rules,
  isRequired,
  isDisabled = true,
  modalRef,
  selectedEmployee,
  options,
}) => {
  const employeeOptions = [
    {
      label: 'დაამატე თანამშრომელი',
      isCustom: true,
      onCustomClick: modalRef?.current?.handleOpenModal,
    },
    ...options,
  ]

  return (
    <Select
      control={control}
      name={fieldName}
      label={label}
      isRequired={isRequired}
      errors={errors}
      isEmployeeSelect={true}
      rules={rules}
      options={employeeOptions}
      isDisabled={isDisabled}
      modalRef={modalRef}
      optionRenderer={employeesListOptionRenderer}
      singleValue={singleValue}
      value={selectedEmployee || null}
      onChange={(selected) => control.setValue(fieldName, selected)}
    />
  )
}

export default EmployeesSelect
