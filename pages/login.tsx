import React, { useState } from 'react';

// 定义登录页面组件
const LoginPage: React.FC = () => {
  // 定义状态来存储用户名和密码
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 处理表单提交事件
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 在此处添加处理登录逻辑，例如发送登录请求到服务器
    console.log('Username:', username);
    console.log('Password:', password);
  }

  return (
    <div>
      <h1>Login</h1>
      {/* 登录表单 */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
