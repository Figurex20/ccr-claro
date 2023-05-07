import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const Calendar = (props:any) => {
  const { setDate, newDate } = props

  const [startDate, setStartDate] = useState(newDate)

  setDate(startDate)

  return (
    <div className='d-flex  '>
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date)
          setDate(date)
        }}
        timeInputLabel='Time:'
        dateFormat='dd/MM/yyyy h:mm aa'
        showTimeInput
        locale='es'
        isClearable
        className=' border border-3 form-control'
      />
    </div>
  )
}
