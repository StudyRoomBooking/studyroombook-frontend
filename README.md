
<p align="center">
  <img src="./public/studyroombook_logo_resized.png" height="256">
  <h1 align="center">Study Room Booking</h1>
  <h4 align="center"> Frontend Platform</h4>
<p align="center"> 


[![CI status][ci-badge]][ci-workflow] [![CircleCI](https://dl.circleci.com/status-badge/img/circleci/7dpnncKR8JfqpAGWYihiTE/LKGqWG9ChBCoaPCagWYsHk/tree/main.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/circleci/7dpnncKR8JfqpAGWYihiTE/LKGqWG9ChBCoaPCagWYsHk/tree/main) [![codecov](https://codecov.io/gh/StudyRoomBooking/studyroombook-frontend/graph/badge.svg?token=64ZP3SQJLR)](https://codecov.io/gh/StudyRoomBooking/studyroombook-frontend)

[ci-badge]: https://github.com/StudyRoomBooking/studyroombook-frontend/actions/workflows/deploy.yml/badge.svg
[ci-workflow]: https://github.com/StudyRoomBooking/studyroombook-frontend/actions/workflows/deploy.yml

本项目是一个自习室预约平台. 后端可以在[这里]()访问 This project is the frontend for a study room reservation platform. The backend for this project can be found [here]().

## 配置环境 Environment Setup
下载并安装[nvm](https://github.com/nvm-sh/nvm)，使用nvm配置node版本。
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

## 测试和代码覆盖率
本项目使用[cypress]来做end-to-end和component测试
```sh
npm run predev:instrument-clean
npm run dev:instrumented
# 在不同terminal打开
npx cypress open

# 或者headless
npm run cypress-run-e2e

# 报告，然后可以在coverage/index.html访问
npm run coverage-report
```

我们使用[circleci]来在每一个push事件跑自动测试，然后把报告上传到[code cov](). 





circleci本地检查config是否合格
```sh
circleci config validate .circleci/config.yml # validate config
circleci config process .circleci/config.yml > process.yml # create local
circleci local execute job1
```
本地检查codecov.yml是否合格
```sh
cat codecov.yml | curl --data-binary @- https://codecov.io/validate
```

## 功能 Features 


