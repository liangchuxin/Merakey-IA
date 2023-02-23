import SecondSide from "./secondSide";
import React, { useEffect, useRef } from "react";
import IsLoggedIn, { logout, getCurrentUser } from "../utilities/loginStatus";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/userSettings.scss";
// icons
import settingsIco from "./icons/settings.svg";

function UserSettings() {
  const [name, setName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [status, setStatus] = React.useState("");
  if (getCurrentUser) {
    console.log(getCurrentUser);
    var username = getCurrentUser.username;
    var email = getCurrentUser.email;
    var uid = getCurrentUser.id;
    var roles = [];
    getCurrentUser.roles.forEach((x, i) =>
      roles.push(x.slice(5).toLowerCase())
    );
  }
  const updateProfile = (avatar, name, status) => {
    const data = { id: uid, avatar: avatar, displayName: name, status: status };
    fetch(`http://localhost:8080/api/profiles`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // alert("Profile is updated successfully.");
        toast.success("Profile is updated successfully.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "foo-bar",
          onClose: () => document.location.reload(),
        });
        // document.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  if (getCurrentUser) {
    console.log(getCurrentUser);
    var username = getCurrentUser.username;
    var email = getCurrentUser.email;
    var id = getCurrentUser.id;
    var roles = [];
    getCurrentUser.roles.forEach((x, i) =>
      roles.push(x.slice(5).toLowerCase())
    );
    console.log(roles);
  }
  const getUser = (userId, field) => {
    fetch(`http://localhost:8080/api/profiles/${userId}`, {
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
  React.useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = () => {
    var avatar = document.getElementById("avatar").value;
    var name = document.getElementById("name").value;
    var status = document.getElementById("status").value;
    if (validate(avatar, name, status)) {
      console.log(avatar, name, status);
      updateProfile(avatar, name, status);
    }
  };
  const validate = (avatar, name, status) => {
    if (!existCheck(avatar, name, status)) {
      toast.error("Fields cannot be empty!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return false;
    } else if (!specialCharacterCheck(name)) {
      toast.error("No special characters allowed.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return false;
    } else if (!lengthCheck(name)) {
      toast.error("Name is too long!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return false;
    } else {
      return true;
    }
  };
  const existCheck = (name, avatar, status) => {
    if (name == "" || avatar == "" || status == "none") {
      return false;
    } else {
      return true;
    }
  };
  const specialCharacterCheck = (name) => {
    var stringWithout = name.replace(
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
      ""
    );
    if (stringWithout != name) {
      return false;
    } else {
      return true;
    }
  };
  const lengthCheck = (name) => {
    if (name.length >= 25) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <>
      <SecondSide />
      <section className="user-main" style={{ color: `white` }}>
        <div className="main-container">
          <ToastContainer autoClose={2000} theme="dark" transition={Slide} />
          <h2>
            <img src={settingsIco} />
            <span>User Settings</span>
          </h2>
          <h3 style={{ margin: `50px auto 15px`, textAlign: `center` }}>
            <span>User Profiles</span>
          </h3>
          <input
            className="setting-field"
            id="name"
            placeholder="Please input display name…"
            defaultValue={name}
          />
          <input
            className="setting-field"
            id="avatar"
            placeholder="Please input your avatar link…"
            defaultValue={avatar}
          />
          <br />
          <select id="status" name="status">
            <option value="none">== Choose Status ==</option>
            <option
              selected={status == "gaming"}
              value="gaming"
            >{`-> 🎮 Gaming`}</option>
            <option
              selected={status == "offline"}
              value="offline"
            >{`-> 🤕 Offline`}</option>
            <option
              selected={status == "secret"}
              value="secret"
            >{`-> 🤫 Secret`}</option>
          </select>

          <div className="submit-btn" onClick={() => handleSubmit()}>
            UPDATE SETTINGS
          </div>
        </div>
        <div className="bg-overlay" />
      </section>
    </>
  );
}
export default UserSettings;
