import './InputLabel.scss'

const InputLabel = ({fieldName, label, isRequired, isDisabled = false}) => {

  return (
      <label className={`label ${isDisabled ? 'disabled' : ''}`} htmlFor={fieldName}>{label}{isRequired && '*'}</label>
  )
}

export default InputLabel;