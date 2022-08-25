import React from 'react';
import MainHeader from './MainHeader';

const Layout = ({ children }) => {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
};

export default Layout;
