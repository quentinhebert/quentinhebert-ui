import React, { useEffect, useMemo, useState } from "react";
import apiCall from "../../services/apiCalls/apiCall";
import { getToken, setRefreshToken, setToken } from "../../services/cookies";
import { getUser, logout } from "../../services/utils";

function withUser(WrappedComponent) {
  function UserEnhancer(props) {
    const {} = props;
    const [accessToken, setAccessToken] = useState(getToken());
    const [user, setUser] = useState(null);

    const handleSetTokens = (token, refreshToken) => {
      setToken(token); // Cookies
      setRefreshToken(refreshToken); // Cookies
      setAccessToken(getToken()); // State from cookie
    };

    const fetchUser = async () => {
      const userFromToken = getUser(accessToken);
      const res = await apiCall.users.get(userFromToken.id);
      if (res && res.ok) {
        const jsonRes = await res.json();
        const userData = jsonRes[0];
        setUser(userData);
        return userData;
      }
    };

    useEffect(() => {
      if (accessToken) fetchUser();
    }, [accessToken]);

    const logoutFunc = () => {
      setAccessToken(null);
      setUser(null);
      logout();
    };

    return (
      <WrappedComponent
        {...props}
        user={user}
        handleSetTokens={handleSetTokens}
        refreshUser={fetchUser}
        logout={logoutFunc}
      />
    );
  }
  return UserEnhancer;
}

export default withUser;
