import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "../src/services/axios";

export default function Login() {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: any) => {
    // Make a POST request to the server
    const data = {
      username: values.username,
      password: values.password,
    };
    try {
      const response = await axios.post("/users/login", data);
      console.log(response);
      if (response.status === 200) {
        messageApi.success("登记成功！", 2.5);
        window.location.href = "/home";
      } else if (response.status === 400) {
        messageApi.error("用户名或密码错误，请重新输入！", 2.5);
      }
    } catch {
      messageApi.error("登记有问题，请重新登入", 2.5);
    }

    // 对 values 进行判断，并根据条件执行不同的逻辑
    if (values.username.length === 3 && values.password === "123456") {
      if (values.username[0] === "0") {
        console.log("Success:", values);
        messageApi.success("登录成功！", 2.5);
        window.location.href = "/management_super";
      } else if (values.username[0] === "1") {
        console.log("Success:", values);
        messageApi.success("登录成功！", 2.5);
        window.location.href = "/management_public";
      } else if (values.username[0] === "2") {
        console.log("Success:", values);
        messageApi.success("登录成功！", 2.5);
        window.location.href = "/management_cs";
      } else if (values.username[0] === "3") {
        console.log("Success:", values);
        messageApi.success("登录成功！", 2.5);
        window.location.href = "/management_law";
      } else {
        messageApi.error("用户名或密码错误，请重新输入！", 2.5);
      }
    } else if (values.username.length === 6 && values.password === "123456") {
      if (values.username[0] === "2") {
        console.log("Success:", values);
        messageApi.success("登录成功！", 2.5);
        window.location.href = "/home_cs";
      } else if (values.username[0] === "3") {
        console.log("Success:", values);
        messageApi.success("登录成功！", 2.5);
        window.location.href = "/home_law";
      } else {
        messageApi.error("用户名或密码错误，请重新输入！", 2.5);
      }
    } else {
      messageApi.error("用户名或密码错误，请重新输入！", 2.5);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <main
      className="flex items-center justify-center"
      style={{ height: "100vh", width: "100vw", backgroundColor: "#CBFCDF" }}
    >
      {contextHolder}{" "}
      {/* Render message context holder at the top of your component tree */}
      <div
        style={{
          width: "90vw",
          height: "90vh",
          display: "flex",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "white",
        }}
      >
        <div style={{ width: "50%" }}>
          <h2
            className="text-black text-5xl"
            style={{ marginLeft: "80px", paddingTop: "40%" }}
          >
            Login
          </h2>
          <p className="text-black text-1xl" style={{ marginLeft: "80px" }}>
            欢迎来StudyRoomBooking
          </p>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            style={{ marginInline: "80px", paddingTop: "20px" }}
          >
            <Form.Item
              label="用户"
              name="username"
              rules={[{ required: true, message: "请输入你的用户名!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入你的密码！" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  console.log("Login button clicked");
                }}
                style={{
                  width: "100%",
                  backgroundColor: "#12B987",
                  height: "50px",
                  marginTop: "50px",
                }}
              >
                登录
              </Button>
            </Form.Item>
          </Form>

          {/* Own button */}
          {/* <Button
            type="primary"
            onClick={() => {
              messageApi.loading("正在加载中...", 2.5);
            }}
            style={{
              width: "100%",
              backgroundColor: "#12B987",
              height: "50px",
              marginTop: "50px",
              marginLeft: "80px",
            }}
          > Button </Button> */}
        </div>

        <div style={{ width: "50%", backgroundColor: "#D6FFF2" }}>
          {/* Image Placeholder */}
        </div>
      </div>
    </main>
  );
}
