import React from "react";
import moment from "moment";
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

// TODO 清理带吗
const binaryToHourlyBookings = (data: any) => {
  const converted = data.map((seat: any) => {
    const buffer = seat.hours_booked.data;

    // Convert buffer to a binary string representation
    let binaryString = buffer
      .map((byte: any) => byte.toString(2).padStart(8, "0"))
      .join("");

    // Map each bit to its corresponding hour
    const hourlyBookings: { [key: string]: number } = {};
    hourlyBookings["key"] = seat.seat_id;
    hourlyBookings["seat_id"] = seat.seat_id;
    hourlyBookings["seat_has_outlet"] = seat.seat_has_outlet;
    for (let hour = 0; hour < binaryString.length; hour++) {
      const time_day = hour > 12 ? "pm" : "am";
      if (binaryString[hour] === "1") {
        hourlyBookings[`_${hour}${time_day}`] = 1;
      } else hourlyBookings[`_${hour}${time_day}`] = 0;
    }
    console.log("Hourly bookings", hourlyBookings);
    return hourlyBookings; // Return the mapped value
  });

  return converted;
};

// 吧二进制转换成小时
const binaryToHourlyConversion = (data: any) => {
  let binaryString = data
    .map((byte: any) => byte.toString(2).padStart(8, "0"))
    .join("");

  // Map each bit to its corresponding hour
  const hourlyBookings: { [key: string]: number } = {};
  for (let hour = 0; hour < binaryString.length; hour++) {
    const time_day = hour > 12 ? "pm" : "am";
    if (binaryString[hour] === "1") {
      hourlyBookings[`_${hour}${time_day}`] = 1;
    } else hourlyBookings[`_${hour}${time_day}`] = 0;
  }
  return hourlyBookings;
};

// 获取已经预约的时间
const extractHourlyBookingsThatAreBooked = (data: any) => {
  const binaryString = data
    .map((byte: any) => byte.toString(2).padStart(8, "0"))
    .join("");

  const bookedHours: number[] = [];
  for (let hour = 0; hour < binaryString.length; hour++) {
    if (binaryString[hour] === "1") {
      bookedHours.push(hour);
    }
  }
  return bookedHours;
};

const extractHourlyBookingsThatAreNotBooked = (data: any) => {
  const binaryString = data
    .map((byte: any) => byte.toString(2).padStart(8, "0"))
    .join("");

  const bookedHours: number[] = [];
  for (let hour = 0; hour < binaryString.length; hour++) {
    if (binaryString[hour] === "0") {
      bookedHours.push(hour);
    }
  }
  return bookedHours;
};

// 把小时转换成二进制
const hourlyToBinaryConversion = (data: any) => {
  let binaryString = "";
  for (let hour = 0; hour < 24; hour++) {
    if (data.includes(hour)) {
      binaryString += "1";
    } else binaryString += "0";
  }
  return binaryString;
};

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

const handleCancelBooking = async (record: any) => {
  console.log("Cancel booking", record);
  try {
    const data = {
      booking_id: record.booking_id,
    };
    const response = await axios.post(`/bookings/cancelBooking`, data);
    if (response.status === 200) {
      message.success("取消预约成功", 2.5);
      // Referesh the page
      window.location.reload();
    }
  } catch (error: any) {
    console.error("handleCancelBooking error:", error.code, error.message);
    message.error("取消预约失败", 2.5);
  }
};

const handleRebook = async (record: any) => {
  console.log("Rebook", record);
};

const bookingHistoryColumns = [
  {
    title: "房间号",
    dataIndex: "room_id",
    key: "room_id",
  },
  {
    title: "位置号",
    dataIndex: "seat_id",
    key: "seat_id",
  },
  {
    title: "哪天预约",
    dataIndex: "time_of_booking",
    key: "time_of_booking",
  },
  {
    title: "预约日期",
    dataIndex: "date_booked",
    key: "date_booked",
  },
  {
    title: "预约时间",
    dataIndex: "hours_booked",
    key: "hours_booked",
    render: (text: any, record: any) => (
      <>
        {record.hours_booked.map((hour: any) => {
          return (
            <Tag key={hour}>
              {hour}-{hour + 1}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (tags: any) => (
      <>
        {[tags].map((tag: any) => {
          let color = "green";
          if (tag === "booked") {
            color = "yellow";
          } else if (tag === "cancelled") {
            color = "red";
          } else if (tag === "noshow") {
            color = "volcano";
          } else if (tag === "completed") {
            color = "green";
          }
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
    render: (text: any, record: any) => (
      <>
        {record._7am === 1 ? (
          <Tag color="red">已约</Tag>
        ) : (
          <Tag color="green">可约</Tag>
        )}
      </>
    ),
  },
  {
    title: "8:00",
    dataIndex: "8am",
    key: "8am",
    render: (text: any, record: any) => (
      <>
        {record._8am === 1 ? (
          <Tag color="red">已约</Tag>
        ) : (
          <Tag color="green">可约</Tag>
        )}
      </>
    ),
  },
  {
    title: "9:00",
    dataIndex: "9am",
    key: "9am",
    render: (text: any, record: any) => (
      <>
        {record._9am === 1 ? (
          <Tag color="red">已约</Tag>
        ) : (
          <Tag color="green">可约</Tag>
        )}
      </>
    ),
  },
  {
    title: "10:00",
    dataIndex: "10am",
    key: "10am",
    render: (text: any, record: any) => (
      <>
        {record._10am === 1 ? (
          <Tag color="red">已约</Tag>
        ) : (
          <Tag color="green">可约</Tag>
        )}
      </>
    ),
  },
  {
    title: "11:00",
    dataIndex: "11am",
    key: "11am",
    render: (text: any, record: any) => (
      <>
        {record._11am === 1 ? (
          <Tag color="red">已约</Tag>
        ) : (
          <Tag color="green">可约</Tag>
        )}
      </>
    ),
  },
  {
    title: "12:00",
    dataIndex: "12am",
    key: "12am",
    render: (text: any, record: any) => (
      <>
        {record._12am === 1 ? (
          <Tag color="red">已约</Tag>
        ) : (
          <Tag color="green">可约</Tag>
        )}
      </>
    ),
  },
  {
    title: "13:00",
    dataIndex: "13pm",
    key: "13pm",
    render: (text: any, record: any) => (
      <>
        {record._13pm === 1 ? (
          <Tag color="red">已约</Tag>
        ) : (
          <Tag color="green">可约</Tag>
        )}
      </>
    ),
  },
  {
    title: "14:00",
    dataIndex: "14pm",
    key: "14pm",
    render: (text: any, record: any) => (
      <>
        {record._14pm === 1 ? (
          <Tag color="red">已约</Tag>
        ) : (
          <Tag color="green">可约</Tag>
        )}
      </>
    ),
  },
  {
    title: "15:00",
    dataIndex: "15pm",
    key: "15pm",
    render: (text: any, record: any) => (
      <>
        {record._15pm === 1 ? (
          <Tag color="red">已约</Tag>
        ) : (
          <Tag color="green">可约</Tag>
        )}
      </>
    ),
  },
  {
    title: "15:00",
    dataIndex: "15pm",
    key: "15pm",
    render: (text: any, record: any) => (
      <>
        {record._15pm === 1 ? (
          <Tag color="red">已约</Tag>
        ) : (
          <Tag color="green">可约</Tag>
        )}
      </>
    ),
  },
  {
    title: "16:00",
    dataIndex: "16pm",
    key: "16pm",
    render: (text: any, record: any) => (
      <>
        {record._16pm === 1 ? (
          <Tag color="red">已约</Tag>
        ) : (
          <Tag color="green">可约</Tag>
        )}
      </>
    ),
  },
  {
    title: "17:00",
    dataIndex: "17pm",
    key: "17pm",
    render: (text: any, record: any) => (
      <>
        {record._17pm === 1 ? (
          <Tag color="red">已约</Tag>
        ) : (
          <Tag color="green">可约</Tag>
        )}
      </>
    ),
  },
  {
    title: "18:00",
    dataIndex: "18pm",
    key: "18pm",
    render: (text: any, record: any) => (
      <>
        {record._18pm === 1 ? (
          <Tag color="red">已约</Tag>
        ) : (
          <Tag color="green">可约</Tag>
        )}
      </>
    ),
  },
  {
    title: "19:00",
    dataIndex: "19pm",
    key: "19pm",
    render: (text: any, record: any) => (
      <>
        {record._19pm === 1 ? (
          <Tag color="red">已约</Tag>
        ) : (
          <Tag color="green">可约</Tag>
        )}
      </>
    ),
  },
  {
    title: "20:00",
    dataIndex: "20pm",
    key: "20pm",
    render: (text: any, record: any) => (
      <>
        {record._20pm === 1 ? (
          <Tag color="red">已约</Tag>
        ) : (
          <Tag color="green">可约</Tag>
        )}
      </>
    ),
  },
  {
    title: "21:00",
    dataIndex: "21pm",
    key: "21pm",
    render: (text: any, record: any) => (
      <>
        {record._21pm === 1 ? (
          <Tag color="red">已约</Tag>
        ) : (
          <Tag color="green">可约</Tag>
        )}
      </>
    ),
  },
  {
    title: "22:00",
    dataIndex: "22pm",
    key: "22pm",
    render: (text: any, record: any) => (
      <>
        {record._22pm === 1 ? (
          <Tag color="red">已约</Tag>
        ) : (
          <Tag color="green">可约</Tag>
        )}
      </>
    ),
  },
  {
    title: "23:00",
    dataIndex: "23pm",
    key: "23pm",
    render: (text: any, record: any) => (
      <>
        {record._23pm === 1 ? (
          <Tag color="red">已约</Tag>
        ) : (
          <Tag color="green">可约</Tag>
        )}
      </>
    ),
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

  // const handleCancelBooking = async (record: any) => {
  //   console.log("Cancel booking", record);
  // };

  // useEffect钩子 用于在组件挂载后执行一些操作
  React.useEffect(() => {
    // 获取房间信息
    const fetchData = async () => {
      try {
        const response = await axios.get("/rooms/get_room_info");
        console.log(response);
        const dataWithKeys = response.data.room_info.map(
          (item: any, index: number) => ({
            // ...item,
            room_id: item.room_number,
            room_name: item.room_name,
            capacity: item.capacity,
            key: index,
          })
        );
        // // console.log(dataWithKeys);
        setRooms(dataWithKeys);
      } catch (error: any) {
        if (error.response) var error_response = error.response.data.error;
        console.error("[get_room_info] error:", error.code, error_response);
      }
    };

    // 获取预约历史
    const fetchBookingHistory = async () => {
      try {
        const response = await axios.get("/users/get_student_requests");
        console.log("Booking History", response.data);

        // const bookingHistoryMap = response.data.map(
        //   (item: any, index: number) => ({
        //     // ...item,
        //     booking_id: item.booking_id,
        //     room_id: item.room_id,
        //     seat_id: item.seat_id,
        //     status: item.status,
        //     date_booked: moment(item.date_booked).format("YYYY-MM-DD"),
        //     time_of_booking: moment(item.time_of_booking).format("YYYY-MM-DD"),
        //     hours_booked: extractHourlyBookingsThatAreBooked(
        //       item.hours_booked.data
        //     ),
        //     key: index,
        //   })
        // );
        // setBookingHistory(bookingHistoryMap);
      } catch (error: any) {
        if (error.response) var error_response = error.response.data.error;
        messageApi.error(error_response, 2.5);
      }
    };

    fetchData();
    fetchBookingHistory();
  }, []);

  const handleRoomSelect = (roomId: string) => {
    console.log("Room selected", roomId);
    setSelectedRoomId(roomId);
  };

  const handleSeatSelect = (seatId: string) => {
    console.log("Seat selected", seatId);
    setSelectedSeatId(seatId);
    const seatHours = roomSeats.find((seat: any) => seat.seat_id === seatId);
    let availableSeatHours: SelectProps["options"] = [];
    let startingHour: number = 0;
    for (let key in seatHours) {
      if (key[0] === "_") {
        if (seatHours[key] === 0) {
          availableSeatHours.push({
            label: startingHour + ":00 - " + (startingHour + 1) + ":00",
            value: startingHour,
            key: startingHour,
          });
        }
        startingHour++;
      }
    }

    console.log("Seat hours", availableSeatHours);
    setSelectedSeatIdHours(availableSeatHours);
    // setSelectedSeatIdHours(seatHours);
  };

  const handleDateSelect = (date: any) => {
    console.log("Selected date", date.format("YYYY-MM-DD"));
    setSelectedDate(date);
    fetchRoomSeats(selectedRoomId, date.format("YYYY-MM-DD"));
  };

  // 获取房间座位信息
  const fetchRoomSeats = async (roomId: string, date: string) => {
    try {
      // const response = await axios.get(`/bookings/rooms/${roomId}/seats`);
      console.log("Fetching Room Seats...");
      const data = {
        date: date,
        roomId: roomId,
      };
      const response = await axios.post(`rooms/get_seat_availability/`, data);
      const roomSeatsData = response.data;
      const roomSeatsDataMapped = binaryToHourlyBookings(roomSeatsData);
      console.log("Room seats data", roomSeatsDataMapped);
      setRoomSeats(roomSeatsDataMapped);
    } catch (error: any) {
      console.error("fetchRoomSeats error:", error.code, error.message);
    }
  };

  const onFinish = async (values: any) => {
    console.log("Finished", values);
    const data = {
      room_id: values.room,
      date_booked: values.date.format("YYYY-MM-DD"),
      hours_booked: hourlyToBinaryConversion(values.times_selected),
      seat_id: values.seat,
    };
    console.log(data);
    try {
      // Booking at /rooms/:roomId/seats/:seatId/book'
      const response = await axios.post(`/bookings/bookseat`, data);
      if (response.status === 200) {
        messageApi.success("预约成功！", 2.5);
      }
    } catch (error) {
      messageApi.error("预约失败，请重新预约", 2.5);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <main style={{ width: "100%" }}>
      <p>TODO: 房间信息 </p>
      <Table dataSource={rooms} columns={columns} />
      <p>TODO: 预约历史表格</p>
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
                房间号{seat.room_id}, 位置Id是{seat.seat_id}, 有充电口
                {seat.seat_has_outlet}
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
