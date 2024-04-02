import React from "react";
import { Table, Button, message } from "antd";
import axios from "../../src/services/axios";

const columns = [
  {
    title: "房间号",
    dataIndex: "room_id",
    key: "room_id",
  },
  {
    title: "房间名字",
    dataIndex: "room_name",
    key: "room_name",
  },
  {
    title: "位置数量",
    dataIndex: "capacity",
    key: "capacity",
  },
];

export default function PersonalSystem() {
  const [messageApi, contextHolder] = message.useMessage();
  const [rooms, setRooms] = React.useState([]); // 设置rooms的状态

  // useEffect钩子 用于在组件挂载后执行一些操作
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/bookings/rooms");
        const dataWithKeys = response.data.map((item: any, index: number) => ({
          ...item,
          key: index,
        }));
        console.log(dataWithKeys);
        setRooms(dataWithKeys);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <p>TODO: 修改显示的内容 预约系统</p>
      <Table dataSource={rooms} columns={columns} />
    </main>
  );
}
