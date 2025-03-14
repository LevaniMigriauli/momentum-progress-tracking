import {useAppContext} from "../../context/appContext.jsx";
import Select from "../../components/ui/Select.jsx";
import {components} from "react-select";
import './EmployeeSelect.scss'

const employeesListOptionRenderer = (props) => {
  const {data, selectOption} = props;

  const handleClick = (event) => {
    event.stopPropagation();

    if (data.isCustom) {
      data.onCustomClick();
      selectOption(null);
    } else {
      selectOption(data);
    }
  };

  return (
      <components.Option {...props} className={`custom-option ${data.isCustom ? 'add-employee' : ''}`}
                         onClick={handleClick}>
        {data.avatar && <img src={data.avatar} alt={data.label} className="option-avatar"/>}
        {data.label}
      </components.Option>
  );
};

const EmployeesSelect = ({control, errors, rules, isRequired, isDisabled, modalRef}) => {
  const {employeesList} = useAppContext()

  const employeeOptions = [
    {
      label: 'დაამატე თანამშრომელი',
      isCustom: true,
      onCustomClick: () => {
        modalRef?.current?.handleOpenModal()
      },
    },
    ...employeesList
  ]


  return (
      <Select control={control} name={'employee'} label={'პასუხისმგებელი თანამშრომელი'} isRequired={isRequired}
              errors={errors}
              rules={rules} options={employeeOptions}
              isDisabled={isDisabled}
              modalRef={modalRef} optionRenderer={employeesListOptionRenderer}
      />
  )

}

export default EmployeesSelect;