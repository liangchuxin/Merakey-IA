import { useNavigate } from "react-router-dom";
import React from "react";

export const SignUpUser = (username, email, password) => {
  const data = {
    username: username,
    email: email,
    password: password,
  };
  fetch(`http://localhost:8080/api/auth/signup`, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      // 注册成功返回200，失败返回原因
      if (!response.ok) {
        return response.text().then((text) => {
          alert(text);
          //   throw new Error(text);
        });
      } else {
        alert("User was registered sucessfully!");
        window.location.href = "/login";
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
};
