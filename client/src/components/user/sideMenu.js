import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

// icons
import menuDash from "./icons/menu-dash.svg";
import menuDashActive from "./icons/menu-dash-active.svg";
import menuEdit from "./icons/menu-edit-2.svg";
import menuEditActive from "./icons/menu-edit-2-active.svg";
import menuCross from "./icons/menu-crosshair.svg";
import menuCrossActive from "./icons/menu-crosshair-active.svg";
import menuClock from "./icons/menu-clock.svg";
import menuClockActive from "./icons/menu-clock-active.svg";
import menuFile from "./icons/menu-file-text.svg";
import menuFileActive from "./icons/menu-file-text-active.svg";
import menuCmt from "./icons/menu-message-square.svg";
import menuCmtActive from "./icons/menu-message-square-active.svg";

function SideMenu() {
  const navigate = useNavigate();
  const [sideState, setSideState] = React.useState("dash");

  const path = window.location.pathname;

  return (
    <div className="main-menu">
      <div
        className={`menu-block ${path === "/user" ? `active` : ``} `}
        onClick={() => {
          navigate("/user");
        }}
      >
        <img src={path === "/user" ? menuDashActive : menuDash} />
        <span>Dashboard</span>
      </div>
      <div
        className={`menu-block ${
          path === "/user/past-problems" ? `active` : ``
        } `}
        onClick={() => {
          navigate("/user/past-problems");
        }}
      >
        <img src={path === "/user/past-problems" ? menuFileActive : menuFile} />
        <span>Past Problems</span>
      </div>
      <div
        className={`menu-block ${path === "/user/comments" ? `active` : ``} `}
        onClick={() => {
          navigate("/user/comments");
        }}
      >
        <img src={path === "/user/comments" ? menuCmtActive : menuCmt} />
        <span>Comments</span>
      </div>
      <div
        className={`menu-block ${path === "/user/add" ? `active` : ``} `}
        onClick={() => {
          navigate("/user/add");
        }}
      >
        <img src={path === "/user/add" ? menuEditActive : menuEdit} />
        <span>Add a Game</span>
      </div>
      <div
        className={`menu-block ${path === "/user/games" ? `active` : ``} `}
        onClick={() => {
          navigate("/user/games");
        }}
      >
        <img src={path === "/user/games" ? menuCrossActive : menuCross} />
        <span>Your Games</span>
      </div>
      <div
        className={`menu-block ${path === "/user/history" ? `active` : ``} `}
        onClick={() => {
          navigate("/user/history");
        }}
      >
        <img src={path === "/user/history" ? menuClockActive : menuClock} />
        <span>Game History</span>
      </div>
    </div>
  );
}
export default SideMenu;
