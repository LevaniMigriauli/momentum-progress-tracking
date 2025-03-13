import './Input.scss'
import InputLabel from "./InputLabel.jsx";


const Input = ({
                 name: fieldName,
                 register,
                 validation,
                 type = 'text',
                 isRequired = false,
                 label,
                 errors,
                 isDirty
               }) => {

  const requiredError = errors?.[fieldName]?.type === 'required'
  const minLengthError = errors?.[fieldName]?.type === 'minLength'
  const maxLengthError = errors?.[fieldName]?.type === 'maxLength'

  const hasError = requiredError || minLengthError || maxLengthError
  const minLengthIsValid = isDirty && !minLengthError && !requiredError
  const maxLengthIsValid = isDirty && !maxLengthError

  return (
      <div className={'form-group'}>
        <InputLabel htmlFor={fieldName} isRequired={isRequired} label={label}/>
        <input className={`input ${hasError ? 'invalid' : minLengthIsValid && maxLengthIsValid ? 'valid' : ""}`}
               id={fieldName} {...register(fieldName, validation)} type={type}/>
        <span
            className={`validation-message ${minLengthError || requiredError ? 'invalid' : minLengthIsValid ? 'valid' : ''}`}>{validation.message}
          {validation?.minLength?.message}
        </span>
        <span
            className={`validation-message ${maxLengthError ? 'invalid' : maxLengthIsValid ? 'valid' : ''}`}>
          {validation?.maxLength?.message}
        </span>
      </div>
  )
}

export default Input;