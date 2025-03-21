import { useState } from 'react'
import { Controller } from 'react-hook-form'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import './DatePicker.scss'
import ReactDatePicker from 'react-date-picker'
import InputLabel from './InputLabel.jsx'
import { georgianMonths, georgianWeekdays } from '../../constants/dates.js'

const DatePicker = ({
  name: fieldName,
  label,
  control,
  isRequired,
  className,
  nextDay,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => {
        const handleDateChange = (date) => {
          if (date instanceof Date) {
            const formattedDate = date.toLocaleDateString('en-CA')
            console.log(formattedDate)
            field.onChange(formattedDate)
            setIsOpen(false)
          }
        }

        return (
          <div className="form-group" onClick={() => setIsOpen(true)}>
            <InputLabel
              name={fieldName}
              label={label}
              isRequired={isRequired}
            />
            <ReactDatePicker
              {...field}
              className={`${className}`}
              value={field.value ?? nextDay}
              format="dd/MM/yyyy"
              dayPlaceholder="DD"
              monthPlaceholder="MM"
              yearPlaceholder="YYYY"
              clearIcon={null}
              calendarIcon={null}
              isOpen={isOpen}
              minDate={nextDay}
              onChange={handleDateChange}
              onCalendarClose={() => setIsOpen(false)}
              onCalendarOpen={() => setIsOpen(true)}
              onKeyDown={(e) => e.preventDefault()}
              calendarProps={{
                formatShortWeekday: (locale, date) =>
                  georgianWeekdays[date.getDay()],
                formatMonthYear: (locale, date) =>
                  `${georgianMonths[date.getMonth()]} ${date.getFullYear()}`,
              }}
            />
          </div>
        )
      }}
    />
  )
}

export default DatePicker
