# Study Room Booking Frontend

[![CI status][ci-badge]][ci-workflow]

[ci-badge]: https://github.com/StudyRoomBooking/studyroombook-frontend/actions/workflows/deploy.yml/badge.svg
[ci-workflow]: https://github.com/StudyRoomBooking/studyroombook-frontend/actions/workflows/deploy.yml

本项目是一个自习室预约平台. This project is the frontend for a study room reservation platform.

## 配置环境 Environment Setup
下载并安装[nvm]()，使用nvm配置node版本。
```shell
nvm use
```

然后下载packages
```shell
npm install
```

## 运行 Running
首先，运行开发server
```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 访问网站

## 文件结构
```sh
pages/            # 页面
    _app.tsx
    about.tsx
src/
    app/
    components/    #可重复使用的组件
    services/
    utils/
public/            #静态文件
tests/             #测试
```

## 功能 Features 


