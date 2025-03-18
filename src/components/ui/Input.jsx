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
  const errorTypes = errors?.[fieldName]?.types || {};
  const requiredError = errors?.[fieldName]?.type === 'required'
  const minLengthError = errors?.[fieldName]?.type === 'minLength'
  const maxLengthError = errors?.[fieldName]?.type === 'maxLength'
  const patternError = errors?.[fieldName]?.type === 'pattern' || 'pattern' in errorTypes

  const hasError = patternError || requiredError || minLengthError || maxLengthError
  const minLengthIsValid = isDirty && !minLengthError && !requiredError
  const maxLengthIsValid = isDirty && !maxLengthError
  const patternIsValid = isDirty && !patternError

  return (
      <div className={'form-group'}>
        <InputLabel htmlFor={fieldName} isRequired={isRequired} label={label}/>
        <input className={`input ${hasError ? 'invalid' : minLengthIsValid && maxLengthIsValid ? 'valid' : ""}`}
               id={fieldName} {...register(fieldName, validation)} type={type}/>
        <span
            className={`validation-message ${minLengthError || requiredError ? 'invalid' : minLengthIsValid ? 'valid' : ''}`}>
          {validation?.minLength?.message}
        </span>
        <span
            className={`validation-message ${maxLengthError ? 'invalid' : maxLengthIsValid ? 'valid' : ''}`}>
          {validation?.maxLength?.message}
        </span>
        {validation?.pattern && <span className={`validation-message ${patternError
          ? 'invalid'
          : patternIsValid ? 'valid' : ''}`}>
          {validation?.pattern?.message}
        </span>}
      </div>
  )
}

export default Input;