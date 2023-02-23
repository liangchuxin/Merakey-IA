import "../styles/navBar.scss";
import logo from "../images/logo.png";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search } from "./search";
import searchIco from "../images/search-white.svg";
import IsLoggedIn, { logOut, getCurrentUser } from "./utilities/loginStatus";

function NavBar(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [searchState, setSearchState] = React.useState(false);
  const closeParentSearch = () => {
    setSearchState(false);
  };
  const openParentSearch = () => {
    setSearchState(true);
  };

  function ShowSearch(props) {
    return <Search show={props.show} closeParent={closeParentSearch} />;
  }
  const path = window.location.pathname.split("/")[1];
  const navigate = useNavigate();

  // console.log("search state: " + searchState);
  if (getCurrentUser) {
    // console.log(getCurrentUser);
    var username = getCurrentUser.username;
    var email = getCurrentUser.email;
    var id = getCurrentUser.id;
    var roles = [];
    getCurrentUser.roles.forEach((x, i) =>
      roles.push(x.slice(5).toLowerCase())
    );
    // console.log(roles);
  }
  const [avatar, setAvatar] = React.useState(
    "https://cdn.jsdelivr.net/gh/liangchuxin/blog-imgs/img/202209210118002.png"
  );
  const getUser = (userId) => {
    fetch(`http://localhost:8080/api/profiles/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAvatar(data.avatar);
      });
  };
  React.useEffect(() => {
    getUser(id);
  }, []);
  if (path === "login" || path === "signup") {
    return (
      <div className="navSimple">
        <div className="logo-container" onClick={() => navigate("/")}>
          <img className="logo" src={logo} />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <ShowSearch show={searchState} />
        <div className="navBar">
          <div className="container">
            <div className="logo-container" onClick={() => navigate("/")}>
              <img className="logo" src={logo} />
            </div>
            <div className="navigation">
              <ul>
                <li className={path === "" ? "active" : ""}>
                  <a onClick={() => navigate("/")}>Home</a>
                </li>
                <li className={path === "about" ? "active" : ""}>
                  <a onClick={() => navigate("/about")}>About</a>
                </li>
                <li className={path === "subjects" ? "active" : ""}>
                  <a onClick={() => navigate("/subjects")}>Subjects</a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      alert("未满十八不得充钱（");
                    }}
                  >
                    Upgrade
                  </a>
                </li>
                <li>
                  <a onClick={() => openParentSearch()}>
                    <img src={searchIco} />
                  </a>
                </li>
                {!IsLoggedIn() && (
                  <li>
                    <a onClick={() => navigate("/signup")} className="li-btn">
                      Sign up
                    </a>
                  </li>
                )}
              </ul>
              {IsLoggedIn() && (
                <li>
                  <a onClick={() => navigate("/user")}>
                    <div className="avatar">
                      <img src={avatar} />
                    </div>
                  </a>
                </li>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default NavBar;
