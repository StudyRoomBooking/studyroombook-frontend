import React from 'react'
import { Table, Tag, Button, Popconfirm, message } from 'antd'
import axios from '../../src/services/axios'
import { tzconversion, getDateHourAmPm } from '../utils/helper'

const handleCancelBooking = async (record: any) => {
  console.log('Cancel booking', record)
  try {
    const data = {
      reservation_id: record.booking_id,
      room_number: record.room_id,
    }
    const response = await axios.post(`/reservation/cancel_reservation`, data)
    if (response.status === 200) {
      message.success('取消预约成功', 2.5)
      window.location.reload()
    }
  } catch (error: any) {
    if (error.response) var error_response = error.response.data.error
    console.error('handleCancelBooking error:', error.code, error_response)
    message.error('取消预约失败', 2.5)
  }
}

const handleRebook = async (record: any) => {
  console.log('Rebook', record)
  message.error('未实现这个功能')
  return
  try {
    const data = {
      date: record.date_booked,
      room: record.room_id,
      seat_number: record.seat_id,
      start_time: record.hours_booked.split(' - ')[0].split(':')[0],
      end_time: record.hours_booked.split(' - ')[1].split(':')[0],
    }
    const response = await axios.post(`/reservation/submit_reservation`, data)
    if (response.status === 200) {
      message.success('再约成功', 2.5)
      // Referesh the page
      window.location.reload()
    }
  } catch (error: any) {
    if (error.response) var error_response = error.response.data.error
    console.error('handleRebook error:', error.code, error_response)
    message.error('再约失败', 2.5)
  }
}

const bookingHistoryColumns: any = [
  { title: '房间号', dataIndex: 'room_id', key: 'room_id' },
  { title: '位置号', dataIndex: 'seat_id', key: 'seat_id' },
  {
    title: '哪天预约',
    dataIndex: 'time_of_booking',
    key: 'time_of_booking',
    defaultSortOrder: 'descend',
    sorter: (a: any, b: any) => {
      const dateA = new Date(a.time_of_booking as string)
      const dateB = new Date(b.time_of_booking as string)
      return dateA.getTime() - dateB.getTime()
    },
  },
  {
    title: '预约日期',
    dataIndex: 'date_booked',
    key: 'date_booked',
    defaultSortOrder: 'descend',
    sorter: (a: any, b: any) => {
      const dateA = new Date(a.date_booked as string)
      const dateB = new Date(b.date_booked as string)
      return dateA.getTime() - dateB.getTime()
    },
  },
  { title: '预约时间', dataIndex: 'hours_booked', key: 'hours_booked' },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (tags: any) => (
      <>
        {[tags].map((tag: any) => {
          let color = 'green'
          if (tag === 'approved') color = 'yellow'
          else if (tag === 'canceled') color = 'red'
          else if (tag === 'noshow') color = 'purple'
          else if (tag === 'checked_in') color = 'green'
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
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    render: (text: any, record: any) => (
      <>
        {record.status == 'approved' ? (
          <Popconfirm title="确认取消?" onConfirm={() => handleCancelBooking(record)}>
            <Button type="primary" danger size="small">
              取消
            </Button>
          </Popconfirm>
        ) : null}
        <div style={{ margin: '5px' }}></div>
        {record.status === 'canceled' ? (
          <Button type="primary" onClick={() => handleRebook(record)} size="small">
            再约
          </Button>
        ) : null}
      </>
    ),
  },
]

export default function ReservationHistory() {
  const [messageApi, contextHolder] = message.useMessage()
  const [bookingHistory, setBookingHistory] = React.useState([])

  // useEffect钩子 用于在组件挂载后执行一些操作
  React.useEffect(() => {
    // 获取预约历史
    const fetchBookingHistory = async () => {
      try {
        const response = await axios.get('/users/get_student_requests')
        // console.log("Booking history", response.data);
        console.log('fetchBookingHistory', response.data)
        const bookingHistoryMap = response.data.map((item: any, index: number) => ({
          booking_id: item.reservation_id,
          room_id: item.room_number,
          seat_id: item.seat_number,
          date_booked: `${getDateHourAmPm(tzconversion(item.start_time))}`,
          time_of_booking: tzconversion(item.request_time),
          hours_booked: `${getDateHourAmPm(tzconversion(item.start_time))} - ${getDateHourAmPm(
            tzconversion(item.end_time)
          )}`,
          status: item.state,
          key: index,
        }))
        setBookingHistory(bookingHistoryMap)
      } catch (error: any) {
        if (error.response) var error_response = error.response.data.error
        messageApi.error(error_response, 2.5)
      }
    }
    fetchBookingHistory()
  }, [messageApi])
  return (
    <main className="w-full">
      {contextHolder}
      <p>我的预约历史表格</p>
      <Table dataSource={bookingHistory} columns={bookingHistoryColumns} />
    </main>
  )
}
