import IsLoggedIn, { logout, getCurrentUser } from "../utilities/loginStatus";
import React, { useEffect, useState, useMemo } from "react";
import SideMenu from "./sideMenu";
import { useNavigate } from "react-router-dom";

// icons
import opMail from "./icons/op-mail.svg";
import opSet from "./icons/op-settings.svg";
import opLogOut from "./icons/op-log-out.svg";
import infoUser from "./icons/info-user.svg";
import infoHash from "./icons/info-hash.svg";
import infoMail from "./icons/info-mail.svg";

function UnChangedSide() {
  const navigate = useNavigate();

  const [status, setStatus] = React.useState("offline");
  const [name, setName] = React.useState("");
  const [avatar, setAvatar] = React.useState(
    "https://cdn.jsdelivr.net/gh/liangchuxin/blog-imgs/img/202209210118002.png"
  );
  const getUser = async (userId) => {
    await fetch(`http://localhost:8080/api/profiles/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAvatar(data.avatar);
        setName(data.displayName);
        setStatus(data.status);
      });
  };
  React.useEffect(() => {
    getUser(id);
  }, []);
  if (getCurrentUser) {
    // console.log(getCurrentUser);
    var id = getCurrentUser.id;
    var roles = [];
    getCurrentUser.roles.forEach((x, i) =>
      roles.push(x.slice(5).toLowerCase())
    );
  }
  return (
    <>
      <div
        onClick={() => navigate("/user/settings")}
        className={`avatar-container ${status}`}
      >
        <div className="avatar-overlay">
          EDIT
          <br />
          PROFILE
        </div>
        {/* <span className={`user-status ${status}`} /> */}
        <img src={avatar} />
      </div>
      <div className="user-name">
        @{name}
        <span className={`user-status ${status}`} />
      </div>
      <div className="operations">
        <div className="op-btn">
          <img src={opMail} />
        </div>
        <div className="op-btn" onClick={() => navigate("/user/settings")}>
          <img src={opSet} />
        </div>
        <div className="op-btn" title="log out" onClick={() => logout()}>
          <img src={opLogOut} />
        </div>
      </div>
    </>
  );
}

function SecondSide() {
  var username = getCurrentUser.username;
  var email = getCurrentUser.email;
  if (getCurrentUser) {
    // console.log(getCurrentUser);
    var id = getCurrentUser.id;
    var roles = [];
    getCurrentUser.roles.forEach((x, i) =>
      roles.push(x.slice(5).toLowerCase())
    );
  }
  const unchanged = React.useMemo(() => <UnChangedSide />, []);
  return (
    <aside>
      <div className="user-sidebar">
        {unchanged}
        <div className="user-info">
          <div className="divider top" />
          <div className="account">
            <img src={infoUser} />
            <span>{username.toLowerCase()}</span>
          </div>
          <div className="uid">
            <img src={infoHash} />
            <span>{id.toString().padStart(7, "0")}</span>
          </div>
          <div className="mail">
            <img src={infoMail} />
            <span>{email}</span>
          </div>
          <div className="badges">
            {roles.map((role) => (
              <div className={`badge ${role}`} title={role}>
                <span className="color-container"></span>
                <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
              </div>
            ))}
          </div>
          <div className="divider bottom" />
        </div>
        <SideMenu />
      </div>
    </aside>
  );
}
export default SecondSide;
