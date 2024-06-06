import React from 'react'
import dayjs from 'dayjs'
import { Table, Tag, Button, Form, TimePicker, DatePicker, Select, Popconfirm, message } from 'antd'
import axios from '../../src/services/axios'
import type { SelectProps } from 'antd'

interface Room {
  start_time: string
  end_time: string
}

const defaultRoom: Room = {
  start_time: '',
  end_time: '',
}

const columns = [
  { title: '房间号', dataIndex: 'room_id', key: 'room_id' },
  { title: '房间名字', dataIndex: 'room_name', key: 'room_name' },
  { title: '位置数量', dataIndex: 'capacity', key: 'capacity' },
  { title: '最早可预约时间', dataIndex: 'start_time', key: 'start_time' },
  { title: '最晚可预约时间', dataIndex: 'end_time', key: 'end_time' },
]

// tagTagRender
const tTR = (record: any, time: any) => (
  <>{record[time] === 1 ? <Tag color="red">已约</Tag> : <Tag color="green">可约</Tag>}</>
)

const bookingAvailableColumns = [
  { title: '位置号', dataIndex: 'seat_id', key: 'seat_id' },
  {
    title: '6:00',
    dataIndex: '6am',
    key: '6am',
    render: (t: any, r: any) => null,
  },
  {
    title: '7:00',
    dataIndex: '7am',
    key: '7am',
    render: (t: any, r: any) => tTR(r, '7am'),
  },
  {
    title: '8:00',
    dataIndex: '8am',
    key: '8am',
    render: (t: any, r: any) => tTR(r, '8am'),
  },
  {
    title: '9:00',
    dataIndex: '9am',
    key: '9am',
    render: (t: any, r: any) => tTR(r, '9am'),
  },
  {
    title: '10:00',
    dataIndex: '10am',
    key: '10am',
    render: (t: any, r: any) => tTR(r, '10am'),
  },
  {
    title: '11:00',
    dataIndex: '11am',
    key: '11am',
    render: (t: any, r: any) => tTR(r, '11am'),
  },
  {
    title: '12:00',
    dataIndex: '12am',
    key: '12am',
    render: (t: any, r: any) => tTR(r, '12am'),
  },
  {
    title: '13:00',
    dataIndex: '13pm',
    key: '13pm',
    render: (t: any, r: any) => tTR(r, '13pm'),
  },
  {
    title: '14:00',
    dataIndex: '14pm',
    key: '14pm',
    render: (t: any, r: any) => tTR(r, '14pm'),
  },
  {
    title: '15:00',
    dataIndex: '15pm',
    key: '15pm',
    render: (t: any, r: any) => tTR(r, '15pm'),
  },
  {
    title: '16:00',
    dataIndex: '16pm',
    key: '16pm',
    render: (t: any, r: any) => tTR(r, '16pm'),
  },
  {
    title: '17:00',
    dataIndex: '17pm',
    key: '17pm',
    render: (t: any, r: any) => tTR(r, '17pm'),
  },
  {
    title: '18:00',
    dataIndex: '18pm',
    key: '18pm',
    render: (t: any, r: any) => tTR(r, '18pm'),
  },
  {
    title: '19:00',
    dataIndex: '19pm',
    key: '19pm',
    render: (t: any, r: any) => tTR(r, '19pm'),
  },
  {
    title: '20:00',
    dataIndex: '20pm',
    key: '20pm',
    render: (t: any, r: any) => tTR(r, '20pm'),
  },
  {
    title: '21:00',
    dataIndex: '21pm',
    key: '21pm',
    render: (t: any, r: any) => tTR(r, '21pm'),
  },
  {
    title: '22:00',
    dataIndex: '22pm',
    key: '22pm',
    render: (t: any, r: any) => tTR(r, '22pm'),
  },
  {
    title: '23:00',
    dataIndex: '23pm',
    key: '23pm',
    render: (t: any, r: any) => tTR(r, '23pm'),
  },
]

const DynamicTable = ({ data, room_info }: any) => {
  const initialBookingHours = [
    { title: '位置号', dataIndex: 'seat_id', key: 'seat_id' },
    {
      title: '0:00',
      dataIndex: '0am',
      key: '0am',
      render: (t: any, r: any) => tTR(r, '7am'),
    },
    {
      title: '1:00',
      dataIndex: '1am',
      key: '1am',
      render: (t: any, r: any) => tTR(r, '1am'),
    },
    {
      title: '2:00',
      dataIndex: '2am',
      key: '2am',
      render: (t: any, r: any) => tTR(r, '2am'),
    },
    {
      title: '3:00',
      dataIndex: '3am',
      key: '3am',
      render: (t: any, r: any) => tTR(r, '3am'),
    },
    {
      title: '4:00',
      dataIndex: '4am',
      key: '4am',
      render: (t: any, r: any) => tTR(r, '4am'),
    },
    {
      title: '5:00',
      dataIndex: '5am',
      key: '5am',
      render: (t: any, r: any) => tTR(r, '5am'),
    },
    {
      title: '6:00',
      dataIndex: '6am',
      key: '6am',
      render: (t: any, r: any) => tTR(r, '6am'),
    },
    {
      title: '7:00',
      dataIndex: '7am',
      key: '7am',
      render: (t: any, r: any) => tTR(r, '7am'),
    },
    {
      title: '8:00',
      dataIndex: '8am',
      key: '8am',
      render: (t: any, r: any) => tTR(r, '8am'),
    },
    {
      title: '9:00',
      dataIndex: '9am',
      key: '9am',
      render: (t: any, r: any) => tTR(r, '9am'),
    },
    {
      title: '10:00',
      dataIndex: '10am',
      key: '10am',
      render: (t: any, r: any) => tTR(r, '10am'),
    },
    {
      title: '11:00',
      dataIndex: '11am',
      key: '11am',
      render: (t: any, r: any) => tTR(r, '11am'),
    },
    {
      title: '12:00',
      dataIndex: '12am',
      key: '12am',
      render: (t: any, r: any) => tTR(r, '12am'),
    },
    {
      title: '13:00',
      dataIndex: '13pm',
      key: '13pm',
      render: (t: any, r: any) => tTR(r, '13pm'),
    },
    {
      title: '14:00',
      dataIndex: '14pm',
      key: '14pm',
      render: (t: any, r: any) => tTR(r, '14pm'),
    },
    {
      title: '15:00',
      dataIndex: '15pm',
      key: '15pm',
      render: (t: any, r: any) => tTR(r, '15pm'),
    },
    {
      title: '16:00',
      dataIndex: '16pm',
      key: '16pm',
      render: (t: any, r: any) => tTR(r, '16pm'),
    },
    {
      title: '17:00',
      dataIndex: '17pm',
      key: '17pm',
      render: (t: any, r: any) => tTR(r, '17pm'),
    },
    {
      title: '18:00',
      dataIndex: '18pm',
      key: '18pm',
      render: (t: any, r: any) => tTR(r, '18pm'),
    },
    {
      title: '19:00',
      dataIndex: '19pm',
      key: '19pm',
      render: (t: any, r: any) => tTR(r, '19pm'),
    },
    {
      title: '20:00',
      dataIndex: '20pm',
      key: '20pm',
      render: (t: any, r: any) => tTR(r, '20pm'),
    },
    {
      title: '21:00',
      dataIndex: '21pm',
      key: '21pm',
      render: (t: any, r: any) => tTR(r, '21pm'),
    },
    {
      title: '22:00',
      dataIndex: '22pm',
      key: '22pm',
      render: (t: any, r: any) => tTR(r, '22pm'),
    },
    {
      title: '23:00',
      dataIndex: '23pm',
      key: '23pm',
      render: (t: any, r: any) => tTR(r, '23pm'),
    },
  ]
  // If room not yet selected, return empty table
  if (room_info === undefined) return <Table />

  console.log('reload')

  // TODO Also dont show times are already passed

  const start_time = room_info.start_time
  const end_time = room_info.end_time
  // Don't include hour cols before start_time and after end_time
  const showCols = initialBookingHours.filter((col) => {
    if (col.title === '位置号') return true
    const hour = parseInt(col.title.split(':')[0])
    return hour >= start_time && hour < end_time
  })

  return <Table dataSource={data} columns={showCols} scroll={{ x: 1000 }} />
}

export default function PersonalSystem() {
  const [messageApi, contextHolder] = message.useMessage()
  const [rooms, setRooms] = React.useState([]) // 设置rooms的状态
  const [selectedRoomId, setSelectedRoomId] = React.useState('')
  const [selectedRoom, setSelectedRoom] = React.useState(defaultRoom) // 设置selectedRoom的状态
  const [roomSeats, setRoomSeats] = React.useState([])
  const [selectedDate, setSelectedDate] = React.useState(dayjs())
  const [selectedSeatId, setSelectedSeatId] = React.useState('')
  const [selectedSeatIdHours, setSelectedSeatIdHours] = React.useState<SelectProps['options']>([])

  // useEffect钩子 用于在组件挂载后执行一些操作
  React.useEffect(() => {
    // 获取房间信息
    const fetchData = async () => {
      try {
        const response = await axios.get('/rooms/get_room_info')
        const dataWithKeys = response.data.room_info.map((item: any, index: number) => ({
          // ...item,
          room_id: item.room_number,
          room_name: item.room_name,
          capacity: item.capacity,
          start_time: item.start_time,
          end_time: item.end_time,
          key: index,
        }))
        setRooms(dataWithKeys)
      } catch (error: any) {
        if (error.response) var error_response = error.response.data.error
        messageApi.error(error_response, 2.5)
        console.error('[get_room_info] error:', error.code, error_response)
      }
    }
    fetchData()
  }, [messageApi])

  const handleRoomSelect = (roomId: string) => {
    console.log('handleRoomSelect', roomId)
    setSelectedRoomId(roomId)
    var selected_room: any = rooms.find((room: any) => room.room_id === roomId)
    setSelectedRoom(selected_room)
  }

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeatId(seatId)
    const seatHours: any = roomSeats.find((seat: any) => seat.seat_id === seatId)
    console.log(seatHours)
    let availableSeatHours: SelectProps['options'] = []

    for (let key in seatHours) {
      // { "7am": 0, "8am": 0, ... } Translate to options

      var time = 0
      if (key.includes('pm')) time = parseInt(key.split('pm')[0])
      else if (key.includes('am')) time = parseInt(key.split('am')[0])
      else continue

      if (seatHours[key] !== 0) continue // Skip if not available

      // Skip if not within the range of room hours
      if (selectedRoom) {
        // if (time < selectedRoom.start_time || time > selectedRoom.end_time) continue
        const startTime = parseInt(selectedRoom.start_time)
        const endTime = parseInt(selectedRoom.end_time)
        if (time < startTime || time > endTime) continue
      }

      availableSeatHours.push({ label: key, value: time, key: time })
    }

    console.log('Seat hours', availableSeatHours)
    setSelectedSeatIdHours(availableSeatHours)
  }

  const handleDateSelect = (date: any) => {
    if (date === null) return
    setSelectedDate(date)
    console.log('Selected date', date)
    fetchRoomSeats(selectedRoomId, date)
  }

  // 获取房间座位信息
  const fetchRoomSeats = async (roomId: string, date: string) => {
    try {
      const timezoneOffset = new Date().getTimezoneOffset() // Gets
      const data = {
        date: date,
        room: roomId,
        timezone_offset: timezoneOffset,
      }
      const response = await axios.post(`/rooms/get_seat_availability`, data)
      console.log('fetchRoomSeats', response.data.message)
      // Returns ['0', '1', '0',...] of length room capacity * 24
      var roomSeatsData = response.data.message
      // Split the array into 24 hour chunks
      roomSeatsData = roomSeatsData.reduce((resultArray: any, item: any, index: any) => {
        const chunkIndex = Math.floor(index / 24)
        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [] // start a new chunk
        }
        // to int
        item = parseInt(item)
        resultArray[chunkIndex].push(item)
        return resultArray
      }, [])
      console.log('Reduced', roomSeatsData)

      // Map the data to table columns
      const roomSeatsDataMapped = roomSeatsData.map((seat: any, index: any) => ({
        seat_id: index,
        '0am': seat[0],
        '1am': seat[1],
        '2am': seat[2],
        '3am': seat[3],
        '4am': seat[4],
        '5am': seat[5],
        '6am': seat[6],
        '7am': seat[7],
        '8am': seat[8],
        '9am': seat[9],
        '10am': seat[10],
        '11am': seat[11],
        '12am': seat[12],
        '13pm': seat[13],
        '14pm': seat[14],
        '15pm': seat[15],
        '16pm': seat[16],
        '17pm': seat[17],
        '18pm': seat[18],
        '19pm': seat[19],
        '20pm': seat[20],
        '21pm': seat[21],
        '22pm': seat[22],
        '23pm': seat[23],
        key: index,
      }))
      setRoomSeats(roomSeatsDataMapped)
    } catch (error: any) {
      console.log(error)
      if (error.response) var error_response = error.response.data.error
      console.error('fetchRoomSeats error:', error.code, error_response)
    }
  }

  const onFinish = async (values: any) => {
    console.log('Finished', values)
    // Change start_time and end_time to 24 hour format, dayjs, start_time is an int
    const start_hour = values.times_selected[0]
    const end_hour = values.times_selected[1]
    // use values.date as the date, add the hour
    const start_time = dayjs().date(values.date.date()).hour(start_hour).minute(0).second(0)
    const end_time = dayjs().date(values.date.date()).hour(end_hour).minute(0).second(0)

    console.log('onFinish', values.date, start_time, end_time)
    const data = {
      date: values.date,
      room: values.room,
      seat_number: values.seat,
      start_time: start_time,
      end_time: end_time,
    }
    console.log(data)
    try {
      const response = await axios.post(`/reservation/submit_reservation`, data)
      if (response.status === 200) {
        messageApi.success('预约成功！', 2.5)
        window.location.reload()
      }
    } catch (error: any) {
      if (error.response) var error_response = error.response.data.error
      messageApi.error(error_response, 2.5)
      console.error('onFinish error:', error.code, error_response)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onClickReservationReset = () => {
    setRoomSeats([])
  }
  return (
    <main style={{ width: '100%' }}>
      {contextHolder}
      <p>房间信息 </p>
      <Table dataSource={rooms} columns={columns} />
      <p>预约表格</p>
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item label="预约间号" name="room">
          <Select onChange={handleRoomSelect} style={{ width: '100%' }} value={selectedRoomId}>
            {rooms.map((room: any) => (
              <Select.Option key={room.room_id} value={room.room_id}>
                房间: {room.room_name}, 可预约时间: {room.start_time} - {room.end_time}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="预约日期" name="date">
          <DatePicker
            value={selectedDate}
            onChange={handleDateSelect}
            disabledDate={(current) => {
              // Disable dates before today(not including today)
              return current < dayjs().subtract(1, 'day')
            }}
          />
        </Form.Item>
        <p>可预约表格</p>
        {/* <Table
          columns={bookingAvailableColumns}
          dataSource={roomSeats}
          scroll={{ x: 1500 }}
        /> */}
        <DynamicTable data={roomSeats} room_info={selectedRoom} />

        <Form.Item label="选择位置" name="seat">
          <Select onChange={handleSeatSelect} style={{ width: '100%' }} value={selectedSeatId}>
            {roomSeats.map((seat: any) => (
              <Select.Option key={seat.seat_id} value={seat.seat_id}>
                房间号{seat.room_id}, 位置Id是{seat.seat_id}
                {/* 有充电口 {seat.seat_has_outlet} */}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="预约时间" name="times_selected">
          <Select mode="multiple" allowClear placeholder={'选择时间段'} options={selectedSeatIdHours} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button type="default" htmlType="reset" onClick={onClickReservationReset}>
            清空
          </Button>
        </Form.Item>
      </Form>
    </main>
  )
}
