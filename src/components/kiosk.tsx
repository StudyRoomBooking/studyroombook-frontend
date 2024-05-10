/**
 * @fileoverview Kiosk page for each individual room, shows the current status of the room
 *
 */

import React, { useState, useEffect } from "react";
import { Button, Input, Space, message, QRCode, Form } from "antd";
import axios from "../services/axios";

import RoomInfoTable from "./roominfo_table";

export default function Kiosk() {
  const [messageApi, contextHolder] = message.useMessage();
  const [roomNumber, setRoomNumber] = useState(100);
  const [checkInRoomNumber, setCheckInRoomNumber] = useState(0);
  const [checkInCode, setCheckInCode] = useState("");
  const [qrCode, setQrCode] = useState("");

  const onRoomSearch = async () => {
    const data = {
      room: roomNumber,
    };

    try {
      // const response = await axios.post("/rooms/get_seat_availability", data);
      const response = await axios.post("/rooms/get_room_kiosk", data);
      // console.log("Room information:", response);
      setQrCode(response.data.checkin_code);
    } catch (error: any) {
      if (error.response) var error_response = error.response.data.error;
      messageApi.error(error_response, 2.5);
      console.error("There was a problem fetching the data:", error);
    }
  };

  const onRoomSearchInputChanged = (e: any) => {
    setRoomNumber(e.target.value);
  };

  const onRoomCheckin = async () => {
    const data = {
      room_number: checkInRoomNumber,
      checkin_code: checkInCode,
    };
    try {
      const response = await axios.post("/rooms/check_in_kiosk", data);
      if (response.status === 200) {
        messageApi.success("签到成功！", 2.5);
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response) var error_response = error.response.data.error;
        messageApi.error(error_response, 2.5);
        console.error("[Error]:", error.code, error_response);
      }
    }
  };

  const onRoomCheckinInputChanged = (e: any) => {
    setCheckInCode(e.target.value);
  };

  const onRoomCheckinRoomInputChanged = (e: any) => {
    setCheckInRoomNumber(e.target.value);
  };

  return (
    <main>
      {contextHolder} <p>TODO: 修改Kiosk页面</p>
      <p> 今天的日期 {new Date().toISOString().split("T")[0]}</p>
      <Space.Compact style={{ width: "100%" }}>
        <Input
          defaultValue={roomNumber}
          placeholder="100"
          onChange={onRoomSearchInputChanged}
        />
        <Button type="primary" onClick={onRoomSearch}>
          查询
        </Button>
      </Space.Compact>
      {qrCode ? <p> 登记码 {qrCode} </p> : null}
      {qrCode ? <QRCode value={qrCode} /> : null}
      <p> 房间信息表格</p>
      {qrCode ? <RoomInfoTable key={qrCode} roomNumber={roomNumber} /> : null}
      <p>签到</p>
      <Form>
        <Form.Item label="房间号">
          <Input
            defaultValue={checkInRoomNumber}
            onChange={onRoomCheckinRoomInputChanged}
          />
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
    </main>
  );
}
