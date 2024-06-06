import React, { useState, useEffect } from 'react'
import { Button, Input, Space, message, QRCode, Form } from 'antd'
import Clock from './clock'
import { tzconversion } from '@/utils/helper'
import axios from 'axios'

export default function Checkin() {
  const [messageApi, contextHolder] = message.useMessage()
  const [checkInRoomNumber, setCheckInRoomNumber] = useState(0)
  const [checkInSeatNumber, setCheckInSeatNumber] = useState(0)
  const [checkInCode, setCheckInCode] = useState('')
  const [checkInMessage, setCheckInMessage] = useState('')

  const onCheckInSeatNumberChanged = (e: any) => {
    setCheckInSeatNumber(e.target.value)
  }

  const onRoomCheckin = async () => {
    const data = {
      room_number: checkInRoomNumber,
      seat_number: checkInSeatNumber,
      checkin_code: checkInCode,
    }
    console.log('Checking in...', data)
    try {
      setCheckInMessage('')
      const response = await axios.post('/rooms/check_in_kiosk', data)
      console.log('Checking in...', response)
      const responseData = response.data

      if (response.status === 200) {
        const username = responseData.username
        const checkinWindow = responseData.checkin_window
        const roomNumber = responseData.room
        const seatNumber = responseData.seat
        const reservationTime = tzconversion(responseData.reservation_start_time)
        const message =
          '你的签到信息如下：\n' +
          '用户名：' +
          username +
          '\n' +
          '房间号：' +
          roomNumber +
          '\n' +
          '座位号：' +
          seatNumber +
          '\n' +
          '签到时间：' +
          reservationTime +
          '\n' +
          '签到时间窗口：' +
          checkinWindow +
          '\n' +
          '结果：成功签到。'
        setCheckInMessage(message)
        messageApi.success(username + '学生签到成功！', 2.5)
      }
    } catch (error: any) {
      var message = ''
      if (error.response) {
        console.log('error.response')
        // 逻辑问题
        var errorMessage = error.response.data.message
        var errorData = error.response.data
        const username = errorData.username
        const checkinWindow = errorData.checkin_window
        const roomNumber = errorData.room
        const seatNumber = errorData.seat
        const reservationTime = tzconversion(errorData.reservation_start_time)
        message =
          message +
          '你的签到信息如下：\n' +
          '用户名：' +
          username +
          '\n' +
          '房间号：' +
          roomNumber +
          '\n' +
          '座位号：' +
          seatNumber +
          '\n' +
          '签到时间：' +
          reservationTime +
          '\n' +
          '签到时间窗口：' +
          checkinWindow +
          '\n结果：'
        if (errorMessage == 1) {
          message = message + '\n' + '不在窗口内签到。'
          errorMessage = '不在窗口内签到'
        } else if (errorMessage == 2) {
          message = message + '\n' + '验证码失败。'
          errorMessage = '验证码失败'
        } else {
          message = error.response.data.error
          errorMessage = error.response.data.error
        }
      }
      messageApi.error(errorMessage)
      setCheckInMessage(message)
      console.error('There was a problem fetching the data:', error)
    }
  }

  const onRoomCheckinInputChanged = (e: any) => {
    setCheckInCode(e.target.value)
  }
  const onRoomCheckinRoomInputChanged = (e: any) => {
    setCheckInRoomNumber(e.target.value)
  }

  return (
    <main className="w-full">
      {contextHolder}
      <p>签到页面</p>
      <div className="flex mb-4">
        今天的日期 <Clock />
      </div>
      <p>签到</p>
      <Form>
        <Form.Item label="房间号">
          <Input defaultValue={checkInRoomNumber} onChange={onRoomCheckinRoomInputChanged} />
        </Form.Item>
        <Form.Item label="座位号">
          <Input defaultValue={checkInSeatNumber} onChange={onCheckInSeatNumberChanged} />
        </Form.Item>
        <Form.Item label="验证码">
          <Input onChange={onRoomCheckinInputChanged} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onRoomCheckin}>
            签到
          </Button>
        </Form.Item>
      </Form>
      {checkInMessage !== '' ? (
        <>
          <p>签到结果</p> <p>{checkInMessage}</p>
        </>
      ) : null}
    </main>
  )
}
