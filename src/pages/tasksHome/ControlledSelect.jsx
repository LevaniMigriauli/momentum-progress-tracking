import React, { useEffect, useRef, useState } from 'react'
import './ControlledSelect.scss'
import Icon from '../../components/common/Icon.jsx'
import Button from '../../components/ui/Button.jsx'

const ControlledSelect = ({
  name,
  options,
  selectedOptions,
  setSelectedOptions,
  isMulti = true,
  label,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [tempSelection, setTempSelection] = useState(() => ({
    ...selectedOptions,
  }))
  const selectRef = useRef(null)

  const toggleMenu = () => {
    setTempSelection({ ...selectedOptions })
    setMenuIsOpen((prev) => !prev)
  }

  const handleSelection = (selectedOption) => {
    setTempSelection((prevSelected) => {
      const updatedSelection = { ...prevSelected }

      if (isMulti) {
        const isAlreadySelected = updatedSelection[name]?.some(
          (option) => option.value === selectedOption.value,
        )
        updatedSelection[name] = isAlreadySelected
          ? updatedSelection[name].filter(
              (option) => option.value !== selectedOption.value,
            )
          : [...(updatedSelection[name] || []), selectedOption]
      } else {
        updatedSelection[name] = [selectedOption]
      }

      return updatedSelection
    })

    if (!isMulti) {
      setMenuIsOpen(false)
    }
  }

  const saveSelection = () => {
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: tempSelection[name] || [],
    }))
    setMenuIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuIsOpen &&
        selectRef.current &&
        !selectRef.current.contains(event.target)
      ) {
        setMenuIsOpen(false)
        setTempSelection({ ...selectedOptions })
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuIsOpen, selectedOptions])

  console.log(options)

  return (
    <div ref={selectRef} className="controlled-select">
      <div
        onClick={toggleMenu}
        className={`select-label ${menuIsOpen ? 'selected' : ''}`}
      >
        {label}
        <Icon
          name={`${menuIsOpen ? 'arrow-down-purple' : 'arrow-down'}`}
          viewBox={'0 0 24 24'}
        />
      </div>

      {menuIsOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelection(option)}
              className="dropdown-option"
            >
              <input
                type="checkbox"
                checked={
                  tempSelection[name]?.some(
                    (selected) => selected.value === option.value,
                  ) || false
                }
                readOnly
                className="option-checkbox"
              />
              {option.avatar && <img src={option.avatar} alt={option.label} />}
              {option.label}
            </div>
          ))}
          <div className={'btn-container'}>
            <Button isPurple onClick={saveSelection} className="select-button">
              არჩევა
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ControlledSelect
