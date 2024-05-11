import React from "react";
// import moment from "moment";
import moment from "moment-timezone";
import dayjs from "dayjs";
import {
  Table,
  Tag,
  Button,
  Form,
  TimePicker,
  DatePicker,
  Select,
  Popconfirm,
  message,
} from "antd";
import axios from "../../src/services/axios";
import type { SelectProps } from "antd";

import { tzconversion } from "../utils/helper";

const columns = [
  { title: "房间号", dataIndex: "room_id", key: "room_id" },
  { title: "房间名字", dataIndex: "room_name", key: "room_name" },
  { title: "位置数量", dataIndex: "capacity", key: "capacity" },
];

const handleCancelBooking = async (record: any) => {
  console.log("Cancel booking", record);
  try {
    const data = {
      reservation_id: record.booking_id,
      room_number: record.room_id,
    };
    const response = await axios.post(`/reservation/cancel_reservation`, data);
    if (response.status === 200) {
      message.success("取消预约成功", 2.5);
      // Referesh the page
      window.location.reload();
    }
  } catch (error: any) {
    if (error.response) var error_response = error.response.data.error;
    console.error("handleCancelBooking error:", error.code, error_response);
    message.error("取消预约失败", 2.5);
  }
};

const handleRebook = async (record: any) => {
  console.log("Rebook", record);
  try {
    const data = {
      date: record.date_booked,
      room: record.room_id,
      seat_number: record.seat_id,
      start_time: record.hours_booked.split(" - ")[0].split(":")[0],
      end_time: record.hours_booked.split(" - ")[1].split(":")[0],
    };
    const response = await axios.post(`/reservation/submit_reservation`, data);
    if (response.status === 200) {
      message.success("再约成功", 2.5);
      // Referesh the page
      window.location.reload();
    }
  } catch (error: any) {
    if (error.response) var error_response = error.response.data.error;
    console.error("handleRebook error:", error.code, error_response);
    message.error("再约失败", 2.5);
  }
};

// tagTagRender
const tTR = (record: any, time: any) => (
  <>
    {record[time] === 1 ? (
      <Tag color="red">已约</Tag>
    ) : (
      <Tag color="green">可约</Tag>
    )}
  </>
);

const bookingHistoryColumns = [
  { title: "房间号", dataIndex: "room_id", key: "room_id" },
  { title: "位置号", dataIndex: "seat_id", key: "seat_id" },
  { title: "哪天预约", dataIndex: "time_of_booking", key: "time_of_booking" },
  { title: "预约日期", dataIndex: "date_booked", key: "date_booked" },
  { title: "预约时间", dataIndex: "hours_booked", key: "hours_booked" },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (tags: any) => (
      <>
        {[tags].map((tag: any) => {
          let color = "green";
          if (tag === "approved") color = "yellow";
          else if (tag === "canceled") color = "red";
          else if (tag === "noshow") color = "volcano";
          else if (tag === "completed") color = "green";
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    render: (text: any, record: any) => (
      // TODO 确认取消预约的操作
      <>
        <Popconfirm
          title="确认取消?"
          onConfirm={() => handleCancelBooking(record)}
        >
          <Button type="primary" danger size="small">
            取消
          </Button>
        </Popconfirm>
        <Button
          type="primary"
          onClick={() => handleRebook(record)}
          size="small"
        >
          再约
        </Button>
      </>
    ),
  },
];

const bookingAvailableColumns = [
  { title: "位置号", dataIndex: "seat_id", key: "seat_id" },
  {
    title: "7:00",
    dataIndex: "7am",
    key: "7am",
    render: (t: any, r: any) => tTR(r, "7am"),
  },
  {
    title: "8:00",
    dataIndex: "8am",
    key: "8am",
    render: (t: any, r: any) => tTR(r, "8am"),
  },
  {
    title: "9:00",
    dataIndex: "9am",
    key: "9am",
    render: (t: any, r: any) => tTR(r, "9am"),
  },
  {
    title: "10:00",
    dataIndex: "10am",
    key: "10am",
    render: (t: any, r: any) => tTR(r, "10am"),
  },
  {
    title: "11:00",
    dataIndex: "11am",
    key: "11am",
    render: (t: any, r: any) => tTR(r, "11am"),
  },
  {
    title: "12:00",
    dataIndex: "12am",
    key: "12am",
    render: (t: any, r: any) => tTR(r, "12am"),
  },
  {
    title: "13:00",
    dataIndex: "13pm",
    key: "13pm",
    render: (t: any, r: any) => tTR(r, "13pm"),
  },
  {
    title: "14:00",
    dataIndex: "14pm",
    key: "14pm",
    render: (t: any, r: any) => tTR(r, "14pm"),
  },
  {
    title: "15:00",
    dataIndex: "15pm",
    key: "15pm",
    render: (t: any, r: any) => tTR(r, "15pm"),
  },
  {
    title: "16:00",
    dataIndex: "16pm",
    key: "16pm",
    render: (t: any, r: any) => tTR(r, "16pm"),
  },
  {
    title: "17:00",
    dataIndex: "17pm",
    key: "17pm",
    render: (t: any, r: any) => tTR(r, "17pm"),
  },
  {
    title: "18:00",
    dataIndex: "18pm",
    key: "18pm",
    render: (t: any, r: any) => tTR(r, "18pm"),
  },
  {
    title: "19:00",
    dataIndex: "19pm",
    key: "19pm",
    render: (t: any, r: any) => tTR(r, "19pm"),
  },
  {
    title: "20:00",
    dataIndex: "20pm",
    key: "20pm",
    render: (t: any, r: any) => tTR(r, "20pm"),
  },
  {
    title: "21:00",
    dataIndex: "21pm",
    key: "21pm",
    render: (t: any, r: any) => tTR(r, "21pm"),
  },
  {
    title: "22:00",
    dataIndex: "22pm",
    key: "22pm",
    render: (t: any, r: any) => tTR(r, "22pm"),
  },
  {
    title: "23:00",
    dataIndex: "23pm",
    key: "23pm",
    render: (t: any, r: any) => tTR(r, "23pm"),
  },
];

export default function PersonalSystem() {
  const [messageApi, contextHolder] = message.useMessage();
  const [rooms, setRooms] = React.useState([]); // 设置rooms的状态
  const [selectedRoomId, setSelectedRoomId] = React.useState("");
  const [roomSeats, setRoomSeats] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [selectedSeatId, setSelectedSeatId] = React.useState("");
  const [selectedSeatIdHours, setSelectedSeatIdHours] = React.useState<
    SelectProps["options"]
  >([]);
  const [startTime, setStartTime] = React.useState(dayjs());
  const [endTime, setEndTime] = React.useState(dayjs());
  const [bookingHistory, setBookingHistory] = React.useState([]);

  // useEffect钩子 用于在组件挂载后执行一些操作
  React.useEffect(() => {
    // 获取房间信息
    const fetchData = async () => {
      try {
        const response = await axios.get("/rooms/get_room_info");
        const dataWithKeys = response.data.room_info.map(
          (item: any, index: number) => ({
            // ...item,
            room_id: item.room_number,
            room_name: item.room_name,
            capacity: item.capacity,
            key: index,
          })
        );
        setRooms(dataWithKeys);
      } catch (error: any) {
        if (error.response) var error_response = error.response.data.error;
        messageApi.error(error_response, 2.5);
        console.error("[get_room_info] error:", error.code, error_response);
      }
    };

    // 获取预约历史
    const fetchBookingHistory = async () => {
      try {
        const response = await axios.get("/users/get_student_requests");
        // console.log("Booking history", response.data);
        const bookingHistoryMap = response.data.map(
          (item: any, index: number) => ({
            booking_id: item.reservation_id,
            room_id: item.room_number,
            seat_id: item.seat_number,
            date_booked: item.reservation_date,
            // time_of_booking: item.request_time
            // time_of_booking: new Date(item.request_time).toString(),
            // time_of_booking: convertUTCToShanghai(item.request_time),
            time_of_booking: tzconversion(item.request_time),
            hours_booked: item.reservation_time,
            status: item.state,
            key: index,
          })
        );
        setBookingHistory(bookingHistoryMap);
      } catch (error: any) {
        if (error.response) var error_response = error.response.data.error;
        messageApi.error(error_response, 2.5);
      }
    };

    fetchData();
    fetchBookingHistory();
  }, []);

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoomId(roomId);
  };

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeatId(seatId);
    const seatHours: any = roomSeats.find(
      (seat: any) => seat.seat_id === seatId
    );
    console.log(seatHours);
    let availableSeatHours: SelectProps["options"] = [];

    for (let key in seatHours) {
      // { "7am": 0, "8am": 0, ... } Translate to options
      var time = 0;
      if (key.includes("pm")) time = parseInt(key.split("pm")[0]);
      else if (key.includes("am")) time = parseInt(key.split("am")[0]);
      else continue;

      if (seatHours[key] !== 0) continue; // Skip if not available

      availableSeatHours.push({
        label: key,
        value: time,
        key: time,
      });
    }

    console.log("Seat hours", availableSeatHours);
    setSelectedSeatIdHours(availableSeatHours);
  };

  const handleDateSelect = (date: any) => {
    if (date === null) return;
    setSelectedDate(date);
    console.log("[handleDateSelect] date", typeof date);
    fetchRoomSeats(selectedRoomId, date);
  };

  // 获取房间座位信息
  const fetchRoomSeats = async (roomId: string, date: string) => {
    try {
      const data = { date: date, room: roomId };
      console.log("[fetchRoomSeats] data", data);
      console.log("[fetchRoomSeats] date", typeof date);
      const response = await axios.post(`/rooms/get_seat_availability`, data);
      // Returns ['0', '1', '0',...] of length room capacity * 24
      var roomSeatsData = response.data.message;
      // Split the array into 24 hour chunks
      roomSeatsData = roomSeatsData.reduce(
        (resultArray: any, item: any, index: any) => {
          const chunkIndex = Math.floor(index / 24);
          if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []; // start a new chunk
          }
          // to int
          item = parseInt(item);
          resultArray[chunkIndex].push(item);
          return resultArray;
        },
        []
      );

      // Map the data to table columns
      // TODO Don't hardcode the hours
      const roomSeatsDataMapped = roomSeatsData.map(
        (seat: any, index: any) => ({
          seat_id: index,
          "7am": seat[7],
          "8am": seat[8],
          "9am": seat[9],
          "10am": seat[10],
          "11am": seat[11],
          "12am": seat[12],
          "13pm": seat[13],
          "14pm": seat[14],
          "15pm": seat[15],
          "16pm": seat[16],
          "17pm": seat[17],
          "18pm": seat[18],
          "19pm": seat[19],
          "20pm": seat[20],
          "21pm": seat[21],
          "22pm": seat[22],
          "23pm": seat[23],
          key: index,
        })
      );
      setRoomSeats(roomSeatsDataMapped);
      console.log("Room seats", roomSeatsDataMapped);
    } catch (error: any) {
      if (error.response) var error_response = error.response.data.error;
      console.error("fetchRoomSeats error:", error.code, error_response);
    }
  };

  const onFinish = async (values: any) => {
    console.log("Finished", values);
    const data = {
      date: values.date,
      room: values.room,
      seat_number: values.seat,
      start_time: values.times_selected[0],
      end_time: values.times_selected[1],
    };
    console.log(data);
    try {
      // Booking at /rooms/:roomId/seats/:seatId/book'
      const response = await axios.post(
        `/reservation/submit_reservation`,
        data
      );
      if (response.status === 200) {
        messageApi.success("预约成功！", 2.5);
      }
    } catch (error: any) {
      if (error.response) var error_response = error.response.data.error;
      messageApi.error(error_response, 2.5);
      console.error("onFinish error:", error.code, error_response);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <main style={{ width: "100%" }}>
      {contextHolder}
      <p>TODO: 房间信息 </p>
      <Table dataSource={rooms} columns={columns} />
      <p>TODO: 我的预约历史表格</p>
      <Table dataSource={bookingHistory} columns={bookingHistoryColumns} />
      <p>TODO: 预约表格</p>
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item label="预约间号" name="room">
          <Select
            onChange={handleRoomSelect}
            style={{ width: "100%" }}
            value={selectedRoomId}
          >
            {rooms.map((room: any) => (
              <Select.Option key={room.room_id} value={room.room_id}>
                {room.room_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="预约日期" name="date">
          <DatePicker value={selectedDate} onChange={handleDateSelect} />
        </Form.Item>
        <p>可预约表格</p>
        <Table
          columns={bookingAvailableColumns}
          dataSource={roomSeats}
          scroll={{ x: 1500 }}
        />

        <Form.Item label="选择位置" name="seat">
          <Select
            onChange={handleSeatSelect}
            style={{ width: "100%" }}
            value={selectedSeatId}
          >
            {roomSeats.map((seat: any) => (
              <Select.Option key={seat.seat_id} value={seat.seat_id}>
                房间号{seat.room_id}, 位置Id是{seat.seat_id}
                {/* 有充电口 {seat.seat_has_outlet} */}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="预约时间" name="times_selected">
          <Select
            mode="multiple"
            allowClear
            placeholder={"选择时间段"}
            options={selectedSeatIdHours}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button type="default" htmlType="reset">
            清空
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
}
