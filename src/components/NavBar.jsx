import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  selectUserData,
  setInput,
  setSignedIn,
  setUserData,
} from "../features/userSlice";
import { Avatar } from "@material-ui/core";
import { GoogleLogout } from "react-google-login";
import "../style/navbar.css";
const NavBar = () => {
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);
  const [inputValue, setInputValue] = useState("tech");
  const handleSubmit = (e) => {
    console.log("clicked");
    e.preventDefault();
    dispatch(setInput(inputValue));
  };
  const dispatch = useDispatch();
  const logout = (response) => {
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
  };
  return (
    <div className="navbar">
      <h1 className="navbar__header">BLOG SITE 📰</h1>
      {isSignedIn && (
        <div className="blog__input">
          <input
            className="search"
            placeholder="Search for a blog"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="submit" onClick={handleSubmit}>
            Search
          </button>
        </div>
      )}

      {isSignedIn ? (
        <div className="navbar__user__data">
          <Avatar
            src={userData?.imageUrl}
            alt={userData?.name}
            className="user"
          />
          <h1 className="signedIn"> {userData?.givenName}</h1>

          <GoogleLogout
            clientId="842064612197-tgt5rqb4vaeal0cup3kun3j6oc5sb47g.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="logout__button"
              >
                Logout 😦
              </button>
            )}
            onLogoutSuccess={logout}
          />
        </div>
      ) : (
        <h1 className="notSignedIn">User not available 😞</h1>
      )}
    </div>
  );
};

export default NavBar;
