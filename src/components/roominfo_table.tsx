/**
 * @fileoverview RoomInfoTable component that displays the room information in a table format. This includes the room number, the room capacity, and the room availability (seat information).
 */

import React from 'react'
import { Table, message, Tag } from 'antd'
import axios from '../services/axios'
import { tzconversion, getDateHourAmPm } from '@/utils/helper'

const bookingHistoryColumns = [
  { title: '房间号', dataIndex: 'room_id', key: 'room_id' },
  { title: '位置号', dataIndex: 'seat_id', key: 'seat_id' },
  { title: '哪天预约', dataIndex: 'time_of_booking', key: 'time_of_booking' },
  { title: '预约日期', dataIndex: 'date_booked', key: 'date_booked' },
  { title: '预约时间', dataIndex: 'hours_booked', key: 'hours_booked' },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (tags: any) => (
      <>
        {[tags].map((tag: any) => {
          let color = 'green'
          if (tag === 'approved') {
            // booked
            color = 'yellow'
          } else if (tag === 'canceled') {
            color = 'red'
          } else if (tag === 'noshow') {
            color = 'purple'
          } else if (tag === 'completed') {
            color = 'green'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    ),
  },
  {
    title: '学生',
    dataIndex: 'student_id',
    key: 'student_id',
  },
]

interface RoomInfoTableProps {
  roomNumber: Number // Adjust the type as per your requirement
}

const RoomInfoTable: React.FC<RoomInfoTableProps> = ({ roomNumber }) => {
  // export default function RoomInfoTable(props: any) {
  const [messageApi, contextHolder] = message.useMessage()
  const [bookingHistory, setBookingHistory] = React.useState([])

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    const getRoomInfo = async () => {
      try {
        const data = {
          room_number: roomNumber,
          date: new Date().toISOString(),
        }
        const response = await axios.post('/reservation/get_room_reservations', data)
        console.log('Room information:', response)
        const bookingHistoryMap = response.data.map((booking: any, index: any) => ({
          room_id: roomNumber,
          seat_id: booking.seat_number,
          time_of_booking: tzconversion(booking.request_time),
          date_booked: booking.reservation_date,
          // hours_booked: booking.reservation_time,
          hours_booked: `${getDateHourAmPm(tzconversion(booking.start_time))} - ${getDateHourAmPm(
            tzconversion(booking.end_time)
          )}`,
          status: booking.state,
          student_id: booking.student_id,
          key: index,
        }))
        console.log('Booking history map:', bookingHistoryMap)
        setBookingHistory(bookingHistoryMap)
      } catch (error: any) {
        if (error.response) var error_response = error.response.data.error
        messageApi.error(error_response, 2.5)
        console.error('There was a problem fetching the data:', error)
      }
    }
    // Get the room information on component mount
    getRoomInfo()

    // Referesh the room information every 60 seconds
    const interval = setInterval(() => {
      getRoomInfo()
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main>
      {contextHolder}
      <Table dataSource={bookingHistory} columns={bookingHistoryColumns}></Table>
    </main>
  )
}

// export default RoomInfoTable
const MemoizedRoomInfoTable = React.memo(RoomInfoTable)
MemoizedRoomInfoTable.displayName = 'RoomInfoTable'

export default MemoizedRoomInfoTable
