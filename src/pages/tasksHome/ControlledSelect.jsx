import React, { useState, useRef, useEffect } from 'react'

const ControlledSelect = ({
  name,
  options,
  selectedOptions,
  setSelectedOptions,
  isMulti = true,
  label
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [tempSelection, setTempSelection] = useState(
    () => ({ ...selectedOptions }))
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
          (option) => option.value === selectedOption.value)
        updatedSelection[name] = isAlreadySelected
          ? updatedSelection[name].filter(
            (option) => option.value !== selectedOption.value)
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
      [name]: tempSelection[name] || []
    }))
    setMenuIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuIsOpen && selectRef.current &&
        !selectRef.current.contains(event.target)) {
        setMenuIsOpen(false)
        setTempSelection({ ...selectedOptions })
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuIsOpen, selectedOptions])

  return (
    <div ref={selectRef} style={{
      maxWidth: '200px',
      border: '1px solid #ccc',
      borderRadius: '4px'
    }}>
      <div
        onClick={toggleMenu}
        style={{
          padding: '10px',
          cursor: 'pointer',
          background: '#fff',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {label}
      </div>

      {menuIsOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            width: '688px',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            zIndex: 10
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelection(option)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                cursor: 'pointer'
              }}
            >
              <input
                type="checkbox"
                checked={tempSelection[name]?.some(
                  (selected) => selected.value === option.value) || false}
                readOnly
                style={{ marginRight: '10px' }}
              />
              {option.label}
            </div>
          ))}
          <button type="button" onClick={saveSelection}>
            არჩევა
          </button>
        </div>
      )}
    </div>
  )
}

export default ControlledSelect
