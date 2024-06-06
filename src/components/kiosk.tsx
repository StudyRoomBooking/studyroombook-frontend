/**
 * @fileoverview Kiosk page for each individual room, shows the current status of the room
 *
 */

import React, { useState, useEffect } from 'react'
import { Button, Input, Space, message, QRCode, Form } from 'antd'
import axios from '../services/axios'
import RoomInfoTable from './roominfo_table'
import Clock from './clock'

export default function Kiosk() {
  const [messageApi, contextHolder] = message.useMessage()
  const [roomNumber, setRoomNumber] = useState(100)
  const [qrCode, setQrCode] = useState('')

  const onRoomSearch = async () => {
    const data = { room: roomNumber }

    try {
      const response = await axios.post('/rooms/get_room_kiosk', data)
      console.log(response)
      setQrCode(response.data.checkin_code)
    } catch (error: any) {
      if (error.response) var error_response = error.response.data.error
      messageApi.error(error_response, 2.5)
      console.error('There was a problem fetching the data:', error)
      setQrCode('')
    }
  }

  const onRoomSearchInputChanged = (e: any) => {
    setRoomNumber(e.target.value)
  }

  return (
    <main className="w-full">
      {contextHolder}
      <div className="w-full items-center justify-center flex flex-col">
        <h1> Kiosk页面 </h1>
        <div className="flex mb-4">
          今天的日期 <Clock />
        </div>
      </div>
      <Space.Compact style={{ width: '100%' }}>
        <Input defaultValue={roomNumber} placeholder="100" onChange={onRoomSearchInputChanged} />
        <Button type="primary" onClick={onRoomSearch}>
          查询
        </Button>
      </Space.Compact>
      <div className="w-full items-center justify-center flex flex-col">
        {qrCode ? <p> 登记码 {qrCode} </p> : null}
        {qrCode ? <QRCode value={qrCode} size={300} /> : null}
      </div>
      <p> 房间信息表格</p>
      {qrCode ? <RoomInfoTable key={qrCode} roomNumber={roomNumber} /> : null}
    </main>
  )
}
