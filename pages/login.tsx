import React from 'react'
import { Form, Input, Button, message } from 'antd'
import axios from '../src/services/axios'

export default function Login() {
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = async (values: any) => {
    // Make a POST request to the server
    const data = {
      username: values.username,
      password: values.password,
    }
    try {
      const response = await axios.post('/auth/login', data)
      console.log('Logging in...', response)
      if (response.status === 200) {
        messageApi.success('登记成功！', 2.5)
        localStorage.setItem('authToken', response.data.authToken)
        window.location.href = '/home'
      }
    } catch (error: any) {
      if (error.response) var error_response = error.response.data.error
      messageApi.error('登记失败', 2.5)
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
          <h2 className="text-black text-5xl" style={{ marginLeft: '80px', paddingTop: '35%' }}>
            Login
          </h2>
          <p className="text-black text-1xl" style={{ marginLeft: '80px' }}>
            欢迎来自习室预约系统
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
              <Input name="username_test" />
            </Form.Item>

            <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入你的密码！' }]}>
              <Input.Password name="password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                name="login"
                htmlType="submit"
                onClick={() => {
                  console.log('Login button clicked')
                }}
                style={{
                  width: '100%',
                  backgroundColor: '#12B987',
                  height: '50px',
                  marginTop: '50px',
                }}
              >
                登录
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                name="register"
                style={{ width: '100%', height: '50px', marginTop: '0px' }}
                onClick={() => {
                  console.log('Register button clicked')
                  window.location.href = '/register'
                }}
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div style={{ width: '50%', backgroundColor: '#D6FFF2' }}>{/* Image Placeholder */}</div>
      </div>
    </main>
  )
}
