import "../styles/login.scss";
import "../styles/signup.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import arrowIco from "../images/arrow-right.svg";
import { SignUpUser } from "./utilities/signUpUser";

function SignUp(props) {
  const navigate = useNavigate();
  React.useEffect(() => {
    document.getElementById("user").focus();
  }, []);
  const [pMode, setPMode] = React.useState(false);

  // handle submit
  const handleSubmit = () => {
    var email = document.getElementById("email").value;
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    var vpass = document.getElementById("vpass").value;
    if (
      emptyCheck(email, user, pass, vpass) &&
      emailCheck(email) &&
      nameLengthCheck(user) &&
      matchCheck(pass, vpass)
    ) {
      SignUpUser(user, email, pass);
    }
  };
  // validation checks
  const emptyCheck = (email, user, pass, vpass) => {
    if (email == "" || user == "" || pass == "" || vpass == "") {
      toast.error("Field(s) cannot be empty!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return false;
    }
    return true;
  };
  const matchCheck = (pass, vpass) => {
    if (pass != vpass) {
      toast.error("The two passwords do not match!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return false;
    }
    return true;
  };
  const emailCheck = (email) => {
    var re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      toast.error("Email is invalid. Please try again.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return false;
    }
    return true;
  };

  const nameLengthCheck = (user) => {
    var length = user.length;
    if (length >= 20) {
      toast.error("Username is too long!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return false;
    }
    return true;
  };

  return (
    <div className="signup-container background">
      <ToastContainer autoClose={2000} theme="dark" transition={Slide} />
      <div className="split-container">
        <div className="titles">
          <div className="tip">Sign up</div>
          <h1>
            <span>Welcome to</span>
            <br />
            Merakey {!pMode ? `🔑` : `🙈`}
          </h1>
          <div className="description">
            Join Merakey, Practice with online question databases in unlimited
            interactive games, for free
          </div>
        </div>
        <div style={{ marginTop: `-35px` }}>
          <div className="form-group">
            <input id="user" placeholder="Username *" />
            <input id="email" placeholder="Email *" />
            <input
              type="password"
              id="pass"
              onFocus={() => setPMode(true)}
              onBlur={() => setPMode(false)}
              placeholder="Password *"
            />
            <input
              type="password"
              id="vpass"
              onFocus={() => setPMode(true)}
              onBlur={() => setPMode(false)}
              placeholder="Verify password *"
            />
            <div className="submit-btn" onClick={() => handleSubmit()}>
              Create Your Account
              <span>
                <img src={arrowIco} />
              </span>
            </div>
          </div>
          <div className="switch-notice">
            Already have an account?&nbsp;&nbsp;
            <span onClick={() => navigate("/login")}>Login here</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
