import './InputLabel.scss'

const InputLabel = ({fieldName, label, isRequired}) => {

  return (
      <label className={'label'} htmlFor={fieldName}>{label}{isRequired && '*'}</label>
  )
}

export default InputLabel;