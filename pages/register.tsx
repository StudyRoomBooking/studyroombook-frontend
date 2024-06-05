import React from 'react'
import { Form, Input, Button, message } from 'antd'
import axios from '../src/services/axios'

export default function Register() {
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = async (values: any) => {
    // Make a POST request to the server
    const data = {
      username: values.username,
      password: values.password,
      email: values.email,
    }
    try {
      const response = await axios.post('/auth/register', data)
      console.log('Logging in...', response)
      if (response.status === 200) {
        messageApi.success('注册成功！', 2.5)
        window.location.href = '/login'
      }
    } catch (error: any) {
      if (error.response) var error_response = error.response.data.error
      messageApi.error(error_response, 2.5)
      console.log(error)
      console.log(error.code, error_response)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <main
      className="flex items-center justify-center"
      style={{ height: '100vh', width: '100vw', backgroundColor: '#CBFCDF' }}
    >
      {contextHolder} {/* Render message context holder at the top of your component tree */}
      <div
        style={{
          width: '90vw',
          height: '90vh',
          display: 'flex',
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: 'white',
        }}
      >
        <div style={{ width: '50%' }}>
          <h2 className="text-black text-5xl" style={{ marginLeft: '80px', paddingTop: '30%' }}>
            Register
          </h2>
          <p className="text-black text-1xl" style={{ marginLeft: '80px' }}>
            欢迎来StudyRoomBooking
          </p>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            style={{ marginInline: '80px', paddingTop: '20px' }}
          >
            <Form.Item label="用户" name="username" rules={[{ required: true, message: '请输入你的用户名!' }]}>
              <Input name="username" />
            </Form.Item>

            <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入你的密码！' }]}>
              <Input.Password name="password" />
            </Form.Item>

            <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入你的邮箱！' }]}>
              <Input name="email" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                name="register"
                htmlType="submit"
                onClick={() => {}}
                style={{
                  width: '100%',
                  backgroundColor: '#12B987',
                  height: '50px',
                  marginTop: '50px',
                }}
              >
                注册
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                name="login"
                style={{ width: '100%', height: '50px', marginTop: '0px' }}
                onClick={() => {
                  window.location.href = '/login'
                }}
              >
                已有账号？点击这里登录
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div style={{ width: '50%', backgroundColor: '#D6FFF2' }}>{/* Image Placeholder */}</div>
      </div>
    </main>
  )
}
