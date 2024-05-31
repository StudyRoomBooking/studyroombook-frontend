/**
 * @fileoverview Management page
 *
 */

import React from 'react'
import { Button, Space, message, Table, Popconfirm, Form, Input } from 'antd'
import axios from '@/services/axios'
import { getLocalTime } from '@/utils/helper'
import dayjs from 'dayjs'

// TODO
const deleteRoom = async (room: any) => {
  message.error('删除房间功能尚未实现')
}

const rooms = [
  { title: '房间号', dataIndex: 'room_id', key: 'room_id' },
  { title: '房间名字', dataIndex: 'room_name', key: 'room_name' },
  { title: '位置数量', dataIndex: 'capacity', key: 'capacity' },
  {
    title: '房间操作',
    dataIndex: 'action',
    key: 'action',
    render: (text: any, record: any) => (
      <>
        <Popconfirm title="确认删除?" onConfirm={() => deleteRoom(record)}>
          <Button type="primary" danger>
            删除
          </Button>
        </Popconfirm>
      </>
    ),
  },
  {
    title: '座位操作',
    dataIndex: 'action',
    key: 'action',
    render: (text: any, record: any) => (
      <>
        <Button type="primary" size="small">
          添加
        </Button>
        {/* Add some spacing between the two */}
        <div style={{ margin: '5px' }}></div>
        <Button type="primary" danger size="small">
          删除
        </Button>
      </>
    ),
  },
]

export default function Management() {
  const [messageApi, contextHolder] = message.useMessage()
  const [userCollege, setUserCollege] = React.useState('')
  const [roomData, setRoomData] = React.useState([{}])

  const expandedRowRender = async (record: any) => {
    const columns: any = [
      { title: '座位号', dataIndex: 'seat_id', key: 'seat_id' },
      { title: '目前状态', dataIndex: 'state', key: 'state' },
    ]

    // Populate with dummy data
    // const data = [];
    // for (let i = 0; i < 3; i++) {
    //   data.push({
    //     key: i,
    //     seat_id: i,
    //     state: "空闲",
    //   });
    // }

    try {
      console.log('new Date().toISOString()', new Date().toISOString()) // Gives UTC time in ISO format, e.g. 2021-10-20T07:00:00.000Z
      console.log(getLocalTime('YYYY-MM-DD HH:mm:ss')) // Uses moment, gives local time in YYYY-MM-DD HH:mm:ss format
      console.log(getLocalTime('ISO')) // Uses moment, gives UTC time in ISO format;
      console.log('dayjs()', dayjs())
      console.log("dayjs.locale('zh-cn')", dayjs().locale('zh-cn'))

      const data = {
        room: record.room_id,
        date: getLocalTime('dayjs'),
      }
      const response = await axios.post('/rooms/get_seat_availability', data)
      console.log(response)
    } catch (error: any) {
      if (error.response) var errorMessage = error.response.data.error
      messageApi.error(errorMessage)
      console.log('[expandedRowRender]', errorMessage)
    }

    const dumy_data: any = []
    return <Table columns={columns} dataSource={dumy_data} pagination={false} />
  }

  React.useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get('users/get_student_info')
        setUserCollege(response.data.college)
      } catch (error: any) {
        if (error.response) var errorMessage = error.response.data.message
        messageApi.error(errorMessage)
        console.log('[getUserInfo]', errorMessage)
      }
    }

    const getRooms = async () => {
      try {
        const response = await axios.get('/rooms/get_room_info')
        console.log(response)
        const responseDataMapped = response.data.room_info.map((room: any, index: any) => ({
          room_id: room.room_number,
          room_name: room.room_name,
          capacity: room.capacity,
          key: index,
        }))
        setRoomData(responseDataMapped)
      } catch (error: any) {
        if (error.response) var errorMessage = error.response.data.error
        messageApi.error(errorMessage)
        console.log('[setRoomData]', error, errorMessage)
      }
    }

    getUserInfo()
    getRooms()
  }, [messageApi])

  const onAddRoomFinish = async (values: any) => {
    console.log('[onAddRoomFinish]', values)
    messageApi.error('添加房间功能尚未实现')
  }

  const onAddRoomFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <main style={{ width: '100%' }}>
      {contextHolder}
      <p>TODO 管理页面</p>
      <p>{userCollege}</p>
      <p>添加房间</p>
      <Form
        name="add_room"
        layout="inline"
        initialValues={{ remember: true }}
        onFinish={onAddRoomFinish}
        onFinishFailed={onAddRoomFinishFailed}
      >
        <Form.Item label="房间号" name="room_number" rules={[{ required: true, message: '请输入房间号' }]}>
          <Input className="w-20" />
        </Form.Item>
        <Form.Item label="房间名字" name="room_name" rules={[{ required: true, message: '输入房间名字' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="位置数量"
          name="capacity"
          rules={[
            {
              type: 'number',
              min: 1,
              max: 60,
              message: '请输入1-60之间的数字',
            },
          ]}
        >
          <Input className="w-20" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            添加
          </Button>
        </Form.Item>
      </Form>
      <p>负责房间表格</p>
      <Table columns={rooms} dataSource={roomData} expandable={{ expandedRowRender }} />
    </main>
  )
}
