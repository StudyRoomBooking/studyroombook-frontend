// pages/_app.tsx

import { AppProps } from 'next/app';
import LoginPage from './login'; // 导入登录页面组件
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // 添加路由规则，使得 '/login' 路径指向登录页面
  if (router.pathname === '/login') {
    return <LoginPage {...pageProps} />;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
