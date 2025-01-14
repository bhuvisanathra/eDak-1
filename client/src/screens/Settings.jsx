import React, { useState, useEffect } from "react";
import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import { Chip } from "@mui/material";

import Navbar from "./Navbar";
import { isAuth } from "../helpers/auth";
// import { arrTopics, arrLanguages } from "../helpers/data";

// import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Settings = () => {
  const [responseData, setResponseData] = useState({
    username: "",
    userProfieImage: "",
    bio: "",
    interests: [],
    languages: [],
  });
  const [setting, setSetting] = useState("profile");
  const [accent, setAccent] = useState("profileAccent");

  useEffect(() => {
    const id = isAuth()._id;
    axios.get(`http://localhost:5000/user/${id}`).then((res) => {
      console.log(res.data);
      setResponseData({
        ...responseData,
        username: res.data.username,
        userProfieImage: res.data.userProfileImage,
        bio: res.data.bio,
        interests: res.data.interests,
        languages: res.data.languages,
      });
    });
    //eslint-disable-next-line
  }, []);

  console.log(responseData);

  return (
    <div>
      <Navbar />
      {/* <ToastContainer /> */}
      <div className="settings-wrapper">
        <div className="side-pane">
          <p
            onClick={() => {
              setSetting("profile");
              setAccent("profileAccent");
            }}
            className={`${accent} profile`}>
            Profile
          </p>
          <p
            onClick={() => {
              setSetting("interests");
              setAccent("interestAccent");
            }}
            className={`${accent} interest`}>
            Interests
          </p>
          <p
            onClick={() => {
              setSetting("languages");
              setAccent("languageAccent");
            }}
            className={`${accent} language`}>
            Languages
          </p>
        </div>
        <div className="border"></div>
        <div className="settings-body">
          {setting === "profile" ? (
            <div className="setting-container">
              <div className="username-wrapper">
                <h3>{responseData.username}</h3>
              </div>
              <div className="user-image-wrapper">
                <img
                  src={responseData.userProfieImage}
                  alt="userProfileImage"
                />
              </div>
              <div className="user-bio-wrapper">
                <label>Bio</label>
                <textarea value={responseData.bio}>{responseData.bio}</textarea>
              </div>
            </div>
          ) : null}
          {setting === "interests" ? (
            <div className="setting-container">
              <div className="username-wrapper">
                <h3>{responseData.username}</h3>
              </div>
              <div className="settings-data-container"></div>
            </div>
          ) : null}
          {setting === "languages" ? (
            <div className="setting-container">
              <div className="username-wrapper">
                <h3>{responseData.username}</h3>
              </div>
              <div className="settings-data-container"></div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Settings;
