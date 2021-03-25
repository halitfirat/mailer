import React from 'react';
import { useSelector } from 'react-redux';

import styles from './Header.module.css';

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  const renderContent = () => {
    switch (user) {
      case null:
        return;
      case false:
        return <a href="/api/login/google">Signin with Google</a>;
      default:
        return <a href="/api/logout">Logout</a>;
    }
  };

  return <div>{renderContent()}</div>;
};

export default Header;
