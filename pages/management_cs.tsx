import React, { useState, useEffect } from 'react'

export default function Management() {
  const [bookingStatus, setBookingStatus] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedRoomNumber, setSelectedRoomNumber] = useState('')

  useEffect(() => {
    // 在组件挂载时，请求初始日期的预约状态
    fetchBookingStatus(selectedDate, selectedRoomNumber)
      .then((data) => {
        setBookingStatus(data)
      })
      .catch((error) => {
        console.error('Error fetching booking status:', error)
      })
  }, [selectedDate, selectedRoomNumber]) // 当selectedDate或selectedRoomNumber变化时，重新请求预约状态

  const fetchBookingStatus = async (date: any, roomNumber: any) => {
    // 向后端请求特定日期和房间号的预约状态
    const formattedDate = formatDate(date)
    const response = await fetch(`http://127.0.0.1:8000/studyroomstate?date=${formattedDate}&roomnumber=${roomNumber}`)
    const data = await response.json()
    return data
  }

  const formatDate = (date: any) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleDateChange = (event: any) => {
    setSelectedDate(new Date(event.target.value))
  }

  const handleRoomNumberChange = (event: any) => {
    setSelectedRoomNumber(event.target.value)
  }

  return (
    <main>
      <h1>Management</h1>
      <div>
        <h2>Booking Status for {formatDate(selectedDate)}:</h2>
        <label htmlFor="date">Select Date:</label>
        <input type="date" id="date" value={formatDate(selectedDate)} onChange={handleDateChange} />
        <label htmlFor="roomNumber">Select Room Number:</label>
        <input type="text" id="roomNumber" value={selectedRoomNumber} onChange={handleRoomNumberChange} />
        <ul>
          {bookingStatus.map((status, index) => (
            <li key={index}>{status}</li>
          ))}
        </ul>
      </div>
    </main>
  )
}
