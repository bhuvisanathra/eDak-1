import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { logout } from "../helpers/auth";
import { Link } from "react-router-dom";
import { isAuth } from "../helpers/auth";

import logo from "../assets/logo.svg";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import CreateIcon from "@mui/icons-material/Create";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { toast } from "react-toastify";
import { ChatState } from "../context/ChatProvider.jsx";

const Navbar = () => {
  const history = useHistory();
  const [responseData, setResponseData] = useState();
  let lat,
    lon = "";

  useEffect(() => {
    const id = isAuth()._id;
    axios
      .get(`http://localhost:5000/user/${id}/profile_picture`)
      .then((res) => {
        setResponseData(res.data.user.userProfileImage);
      });
  }, []);

  const { setComponent, selectedChat, setLocation, location } = ChatState();

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  };

  const showPosition = (pos) => {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;

    let config = {
      method: "get",
      url: `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=cf81bc2d78334d2f8e8e3328618f3d00`,
      headers: {},
    };

    axios(config)
      .then((res) => {
        setLocation(res.data.features[0].properties.country);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => console.log(location));
  };

  return (
    <div className="nav-wrapper">
      <div className="logo-wrapper">
        <img
          src={logo}
          alt="logo"
          onClick={() => {
            history.push("/app");
            setComponent("defaultView");
          }}
          className="logo"
        />
      </div>
      <div className="accessibility-wrapper">
        <button type="button" onClick={getLocation} className="btn">
          Location
        </button>
        <Link to="/app/explore">
          <PersonAddIcon className="access-item" />
        </Link>
        <NotificationsOutlinedIcon className="access-item" />
        <CreateIcon
          className="access-item"
          onClick={() => {
            selectedChat
              ? setComponent("WriteLetter")
              : toast.error("Select a chat First");
          }}
          style={{ cursor: "pointer" }}
        />
        <LogoutIcon
          onClick={() => {
            logout(() => {
              history.push("/login");
            });
          }}
          style={{ cursor: "pointer" }}
          id="logout"
          className="access-item"
        />

        <img
          src={responseData}
          alt="userProfileImage"
          onClick={() => history.push("/app/settings")}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default Navbar;
