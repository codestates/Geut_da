import React from 'react';
import { Outlet, Navigate } from 'react-router';
import * as ROUTES from '../constants/routes';
import IsLoginState from '../states/IsLoginState';
import { useRecoilState } from 'recoil';

// 로그인이 안되면 랜딩으로, 되면 해당 라우트 허용
// If not, return element that will navigate to login page
// If authorized, return an outlet that will render child elements
export function PrivateRoute() {
  const [IsLogin, setIsLogin] = useRecoilState(IsLoginState);

  return IsLogin ? <Outlet /> : <Navigate to={ROUTES.LANDING} />;
}

export function IsUserRedirect() {
  const [IsLogin, setIsLogin] = useRecoilState(IsLoginState);

  return !IsLogin ? <Outlet /> : <Navigate to={ROUTES.MAIN} />;
}
