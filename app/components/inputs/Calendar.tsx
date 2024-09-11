'use client'

import { DateRange, Range, RangeKeyDict } from 'react-date-range'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

interface CalendarProps {
  value: Range // Range is an object with a key of type RangeKey and a value of type Date
  onChange: (value: RangeKeyDict) => void // RangeKeyDict is an object with a key of type RangeKey and a value of type Range
  disabledDates?: Date[] 
}

const Calendar: React.FC<CalendarProps> = ({ value, onChange, disabledDates }) => {
  return (
    <DateRange
      rangeColors={['#852541']} //#262626
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  )
}

export default Calendar
