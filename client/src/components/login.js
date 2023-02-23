import "../styles/login.scss";
import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import arrowIco from "../images/arrow-right.svg";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import LogInUser from "./utilities/logInUser";
import IsLoggedIn, { logOut, getCurrentUser } from "./utilities/loginStatus";

function Login(props) {
  const navigate = useNavigate();

  React.useEffect(() => {
    document.getElementById("user").focus();
  }, []);
  const [pMode, setPMode] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  // async function LogIn(user, pass) {
  //   var userStatus = await LogInUser(user, pass);
  //   return userStatus;
  // }
  async function LogInUser(username, password) {
    const data = {
      username: username,
      password: password,
    };
    fetch(`http://localhost:8080/api/auth/signin`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // 用户名或密码错误显示错误
        if (!response.ok) {
          toast.error("Username or password is not found", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          return false;
          // 登录成功
        } else {
          // alert("User was logged in sucessfully!");
          console.log(response);

          // navigate("/user");
          window.location.href = "/user";
          return response.json();
        }
      })
      .then((data) => {
        console.log("Success:", data);
        if (data.accessToken) {
          localStorage.setItem("user", JSON.stringify(data));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const handleSubmit = () => {
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    if (user == "" || pass == "") {
      toast.error("Field cannot be empty!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      LogInUser(user, pass);
      // var userStatus = LogIn(user, pass);
      // console.log("User Status: " + JSON.stringify(userStatus));
      // console.log(LogInUser(user, pass));
    }
  };
  return (
    <div className="login-container background">
      <ToastContainer autoClose={2000} theme="dark" transition={Slide} />
      <h1>
        Login to your account<span>.</span>
      </h1>
      <h2>
        {!pMode
          ? `Welcome back to Merakey 🔑 !`
          : `Welcome back to Merakey 🙈 !`}
      </h2>
      <div className="form-group">
        <input id="user" placeholder="Username *"></input>
        <input
          id="pass"
          type="password"
          onFocus={() => setPMode(true)}
          onBlur={() => setPMode(false)}
          placeholder="Password *"
        ></input>
        <div className="submit-btn" onClick={() => handleSubmit()}>
          Start Your Journey
          <span>
            <img src={arrowIco} />
          </span>
        </div>
      </div>
      <div className="switch-notice">
        Not a member yet?&nbsp;&nbsp;
        <span onClick={() => navigate("/signup")}>Sign up now</span>
      </div>
    </div>
  );
}
export default Login;
