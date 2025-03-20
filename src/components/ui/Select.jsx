import Select, { components } from 'react-select'
import { Controller } from 'react-hook-form'
import InputLabel from './InputLabel.jsx'

const customStyles = {
  control: (base, state) => {
    return {
      ...base,
      borderRadius: '5px',
      outline: 'none',
      border: `1px solid ${state.selectProps.isValid ? 'var(--color-vivid-red)' : 'var(--color-light-gray)'}`,
      fontSize: '14px',
      fontWeight: '300',
      padding: '4px',
      boxShadow: 'none',
      background: 'var(--color-white)',
      '&:hover': {
        borderColor: `${state.selectProps.isValid ? 'var(--color-vivid-red)' : 'var(--color-light-gray)'} `,
      },
    }
  },
  menu: (base) => ({
    ...base,
    margin: 0,
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  option: (base) => ({
    ...base,
    fontSize: '14px',
    fontWeight: '300',
    color: 'var(--color-deep-black)',
    padding: '9px 14px',
    height: '46px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: '14px',
    fontWeight: '300',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    '& img': {
      borderRadius: '50%',
      height: '28px',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isDisabled
      ? 'var(--color-soft-gray)'
      : 'var(--color-deep-gray)',
  }),
}

const CustomSelect = ({
  name: fieldName,
  options,
  control,
  rules,
  isRequired,
  label,
  errors,
  isDisabled = false,
  optionRenderer,
  singleValue,
  value,
  onChange,
}) => {
  const isValid = !!errors?.[fieldName]

  const selectProps = {
    value: value ?? null,
    options,
    isDisabled,
    isSearchable: false,
    styles: customStyles,
    isValid,
    components: {
      Option: optionRenderer || components.Option,
      SingleValue: singleValue || components.SingleValue,
    },
  }

  return (
    <div className="form-group">
      <InputLabel
        isRequired={isRequired}
        label={label}
        isDisabled={isDisabled}
      />
      {control ? (
        <Controller
          name={fieldName}
          control={control}
          rules={rules}
          render={({ field }) => (
            <Select
              {...field}
              {...selectProps}
              value={field.value ?? null}
              onChange={(selectedOption) => {
                field.onChange(selectedOption || null)
              }}
            />
          )}
        />
      ) : (
        <Select {...selectProps} onChange={onChange} />
      )}
    </div>
  )
}

export default CustomSelect
