/**
 *
 * @fileoverview Analytics page that displays the analytics of the room usage
 */

import React from 'react'
import { Button, Space, Input, message, Col, Row } from 'antd'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, PieChart, Pie } from 'recharts'
import axios from '../services/axios'

const days_of_week: any = [
  { name: 'sun', color: '#BCE7FD' },
  { name: 'mon', color: '#c0bdd7' },
  { name: 'tue', color: '#C492B1' },
  { name: 'wen', color: '#AF3B6E' },
  { name: 'thu', color: '#794160' },
  { name: 'fri', color: '#424651' },
  { name: 'sat', color: '#21fA90' },
]

const days_of_week_up_to: any = [
  { name: 't-0', color: '#BCE7FD' },
  { name: 't-1', color: '#c0bdd7' },
  { name: 't-2', color: '#C492B1' },
  { name: 't-3', color: '#AF3B6E' },
  { name: 't-4', color: '#794160' },
  { name: 't-5', color: '#424651' },
  { name: 't-6', color: '#21fA90' },
]

export default function Analytics() {
  const [messageApi, contextHolder] = message.useMessage()
  const [roomNumber, setRoomNumber] = React.useState(100)
  const [date, setDate] = React.useState(new Date().toISOString().split('T')[0])
  const [hourlyBookingDistribution, setHourlyBookingDistribution] = React.useState([])

  const [acceptedBookings, setAcceptedBookings] = React.useState([])

  React.useEffect(() => {
    const getBookingDistribution = async () => {
      try {
        const response = await axios.get('/analytic/room_booking_distribution')

        const responseData = response.data.data
        console.log('Booking distribution:', responseData)
        // Reformat the data to be used by recharts
        // Format is {roomnumber: count, roomnumber2 : count2}
        // We want to convert it to [{name: roomnumber, value: count}, ...]
        var bookingDistribution: any = []
        for (const [key, value] of Object.entries(responseData)) {
          bookingDistribution.push({ name: key, value: value })
        }

        console.log('Booking distribution:', bookingDistribution)
        setAcceptedBookings(bookingDistribution)
      } catch (error: any) {
        if (error.response) {
          var error_response = error.response.data.error
          messageApi.error(error_response, 2.5)
          console.error('There was a problem fetching the data:', error)
        }
      }
    }

    getBookingDistribution()
  }, [messageApi])

  const onRoomSearch = async () => {
    const data = {
      room_number: roomNumber,
      // TODO Date selector to be added to select the date for the analytics data:
      // For now, use the current date
      date: new Date().toISOString().split('T')[0],
    }

    try {
      const response = await axios.post('/analytic/hourly_booking_distribution', data)

      console.log('Hourly booking distribution:', response)

      // Data is 2D array where each row is the day, and each column is the hour
      // The value at each cell is the number of bookings for that hour
      // Use a multi-line chart to display the data

      // Map it correctly to the data format required by recharts
      const responseData = response.data.data

      var hourlyBookingDistribution: any = []

      var current_date = new Date()
      // These dates are days leading up to the current date (1 week)

      for (var i = 0; i < responseData[0].length; i++) {
        hourlyBookingDistribution.push({
          name: i, // Hour of the day
          't-0': responseData[0][i],
          't-1': responseData[1][i],
          't-2': responseData[2][i],
          't-3': responseData[3][i],
          't-4': responseData[4][i],
          't-5': responseData[5][i],
          't-6': responseData[6][i],
        })
      }

      console.log('Hourly booking distribution:', hourlyBookingDistribution)

      setHourlyBookingDistribution(hourlyBookingDistribution)
    } catch (error: any) {
      if (error.response) {
        var error_response = error.response.data.error
        messageApi.error(error_response, 2.5)
        console.error('There was a problem fetching the data:', error)
      }
    }
  }

  const onRoomSearchInputChanged = (e: any) => {
    setRoomNumber(e.target.value)
  }

  return (
    <main style={{ width: '100%' }}>
      {contextHolder}
      <p>TODO: 修改显示的内容 分析 </p>
      <p> 获取所有当前accepted的预约 </p>
      <PieChart className="justify-center mt-5" style={{ width: '100%' }} width={600} height={300}>
        <Pie
          data={acceptedBookings}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
          label
        />
        <Legend />
      </PieChart>
      <p> 获取所有当前noshow的预约 </p>
      <p> 获取所有当前cancelled的预约 </p>

      <p> 一周的每个房间每小时的预约分布 </p>
      <Space.Compact style={{ width: '100%' }}>
        <Input defaultValue={roomNumber} placeholder="100" onChange={onRoomSearchInputChanged} />
        <Button type="primary" onClick={onRoomSearch}>
          查询
        </Button>
      </Space.Compact>

      {/* Show colors and their meeting */}
      {/* <Row className="mt-10">
        {days_of_week_up_to.map((day: any, index: any) => {
          return (
            <Col span={3} key={index}>
              <div
                style={{
                  backgroundColor: day.color,
                  width: "100%",
                  height: "50px",
                }}
              >
                {new Date(date).getMonth()} -
                {new Date(date).getDate() -
                  (6 - parseInt(day.name.split("-")[1]))}
              </div>
            </Col>
          );
        })}
      </Row> */}

      <LineChart
        className="justify-center mt-5"
        style={{ width: '100%' }}
        width={600}
        height={300}
        data={hourlyBookingDistribution}
        // margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        {days_of_week_up_to.map((day: any, index: any) => {
          return <Line type="monotone" key={index} dataKey={day.name} stroke={day.color} />
        })}
        {/* <Line type="monotone" dataKey="mon" stroke="#8884d8" />
            <Line type="monotone" dataKey="tue" stroke="#8884d8" />
            <Line type="monotone" dataKey="wen" stroke="#8884d8" />
            <Line type="monotone" dataKey="thu" stroke="#8884d8" />
            <Line type="monotone" dataKey="fri" stroke="#8884d8" />
            <Line type="monotone" dataKey="sat" stroke="#8884d8" />
            <Line type="monotone" dataKey="sun" stroke="#8884d8" /> */}
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Legend />
      </LineChart>
    </main>
  )
}
