import React, { useState } from 'react'
import {
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu, theme, Button, Avatar, Space, Image } from 'antd'
const { Header, Content, Footer, Sider } = Layout

import logo from '../public/studyroombook_no_bg.png'
import ReservationSystem from '../src/components/reservationsystem'
import ReservationHistory from '../src/components/reservationhistory'
import PersonalInfo from '../src/components/personalinfo'
import OtherContent from '../src/components/other'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return { key, icon, children, label } as MenuItem
}

const items: MenuItem[] = [
  getItem('预约系统', 'reservation', <PieChartOutlined />),
  getItem('预约历史', 'history', <UserOutlined />),
  getItem('个人信息', 'about', <TeamOutlined />),
  getItem('其他', 'file', <FileOutlined />),
]

export default function Home() {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKey, setSelectedKey] = useState('reservation')
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  // Adjusted onMenuClick to set selected key
  const onMenuClick: MenuProps['onClick'] = (e) => {
    setSelectedKey(e.key)
  }

  // Adjusted getContent to return components
  const getContent = () => {
    switch (selectedKey) {
      case 'reservation':
        return <ReservationSystem />
      case 'history':
        return <ReservationHistory />
      case 'about':
        return <PersonalInfo />
      case 'file':
        return <OtherContent />
      default:
        return <div>未知内容</div>
    }
  }

  return (
    <main className="flex items-center justify-center bg-white">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} trigger={null}>
          <div className="demo-logo-vertical" />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Image className="" src={logo.src} alt="logo" width={90} height={90} preview={false} />
          </div>

          {/* <p className="text-3xl text-white mx-6"> 自习室</p> */}
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={onMenuClick} />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ flex: 1, justifyContent: 'center' }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </div>
            <div className="mx-6">
              <Space>
                <p className="text-black">用户名字</p>
                <Avatar shape="square" size={32} icon={<UserOutlined />} />
              </Space>
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>系统</Breadcrumb.Item>
              <Breadcrumb.Item>预约系统</Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                display: 'flex',
                // justifyContent: "center",
                // alignItems: "center",
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {getContent()}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            StudyRoomBooking ©{new Date().getFullYear()} Created by Team 30
          </Footer>
        </Layout>
      </Layout>
    </main>
  )
}
