import { useNavigate } from "react-router-dom";
import React from "react";
import { ToastContainer, toast, Slide } from "react-toastify";

export const SignUpUser = (username, email, password) => {
  const data = {
    username: username,
    email: email,
    password: password,
  };
  fetch(`http://localhost:8080/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      // 注册成功返回200，失败返回原因
      if (!response.ok) {
        return response.text().then((text) => {
          toast.error(JSON.parse(text).message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          // alert(JSON.parse(text).message);
        });
      } else {
        return response.json();
      }
    })
    .then((data) => {
      const profile = {
        id: data.id,
        displayName: data.username,
      };
      console.log("profile: " + JSON.stringify(profile));
      fetch(`http://localhost:8080/api/profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      }).then((response) => {
        toast.success("User was registered sucessfully!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "foo-bar",
          onClose: () => {
            window.location.href = "/login";
            return response.json();
          },
        });
      });
      console.log("Success:", data);
      console.log("Status code: " + data.status);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
