import {useState} from 'react';
import {Controller} from 'react-hook-form';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './DatePicker.scss';
import ReactDatePicker from 'react-date-picker';
import InputLabel from './InputLabel.jsx';

const georgianWeekdays = ['კვ', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'];
const georgianMonths = [
  'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
  'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
];

const DatePicker = ({name: fieldName, label, control, isRequired, errors, className}) => {
  const [isOpen, setIsOpen] = useState(false);
  // const hasError = !!errors?.[fieldName];

  return (
      <Controller
          name={fieldName}
          control={control}
          render={({field}) => {
            const today = new Date();
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + 1);

            const handleDateChange = (date) => {
              if (date instanceof Date && date >= nextDay) {
                field.onChange(date);
                setIsOpen(false);
              }
            };

            return (
                <div className="form-group" onClick={() => setIsOpen(true)}>
                  <InputLabel name={fieldName} label={label} isRequired={isRequired}/>
                  <ReactDatePicker
                      {...field}
                      className={`${className}`}
                      value={field.value || nextDay}
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
                        formatShortWeekday: (locale, date) => georgianWeekdays[date.getDay()],
                        formatMonthYear: (locale, date) => `${georgianMonths[date.getMonth()]} ${date.getFullYear()}`
                      }}
                  />
                </div>
            );
          }}
      />
  );
};

export default DatePicker;
