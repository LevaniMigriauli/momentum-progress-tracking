import Select from "react-select";
import {Controller} from "react-hook-form";
import './Select.scss'
import InputLabel from "./InputLabel.jsx";

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: "5px",
    outline: "none",
    border: "1px solid var(--color-light-gray)",
    fontSize: "14px",
    fontWeight: "300",
    color: "var(--color-deep-black)",
    padding: "5px",
    boxShadow: "none",
    background: 'var(--color-white)',
  }),
  menu: (provided) => ({
    ...provided,
    margin: 0,
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
  option: (provided) => ({
    ...provided,
    fontSize: "14px",
    fontWeight: "300",
    padding: '9px 14px'
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "14px",
    fontWeight: "300",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? "var(--color-soft-gray)" : "var(--color-deep-gray)",
  }),
};


const CustomSelect = ({
                        name: fieldName,
                        options,
                        control,
                        rules,
                        isRequired,
                        label,
                        errors,
                        isDisabled = false,
                        optionRenderer
                      }) => {

  const hasError = errors?.[fieldName]?.type === 'required'

  return (
      <Controller name={fieldName} control={control} rules={rules} render={({field}) => (
          <div className="form-group">
            <InputLabel isRequired={isRequired} label={label} isDisabled={isDisabled}/>
            <Select
                className={`${hasError ? 'invalid' : ''}`}
                {...field}
                options={options}
                isDisabled={isDisabled}
                isSearchable={false}
                styles={customStyles}
                components={optionRenderer ? {Option: optionRenderer} : null}
            />
          </div>)}
      />
  );
};

export default CustomSelect;
