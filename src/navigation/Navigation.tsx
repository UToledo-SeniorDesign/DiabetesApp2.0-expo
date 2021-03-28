import React, { useContext } from 'react';

import AuthNav from './AuthNav';
import HomeNav from './HomeNav';
import AuthContext from '../util/context/auth-context';

const Navigation:React.FC<{}> = (prop) => {
  const { isLoggedIn }  = useContext(AuthContext);

  return (
    <React.Fragment>
      {!isLoggedIn && <AuthNav />}
      {isLoggedIn && <HomeNav />}
    </React.Fragment>
  );
}

export default Navigation;