import { useNavigate } from "react-router-dom";
import React from "react";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";

export default async function LogInUser(username, password) {
  // const navigate = useNavigate();
  const data = {
    username: username,
    password: password,
  };
  // React.useEffect(() => {
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
        // return response.text().then((text) => {
        //   console.log(text);
        //   // text = text.split('"')[3];
        //   alert(text);
        //   //   throw new Error(text);
        // });
        alert("Username or password is not found");
        return false;
        // 登录成功
      } else {
        alert("User was logged in sucessfully!");
        // window.location.href = "/user";
        // navigate("/user");
        return response.json();
      }
    })
    // .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      console.log("Status code: " + data.status);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  // }, []);
}
