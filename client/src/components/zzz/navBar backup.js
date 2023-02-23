import "../styles/navBar.scss";
import logo from "../images/logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [active, setActive] = useState("home");
  const SwitchTab = (tabName, pageName) => {
    setActive(tabName);
    navigate(`/${pageName}`);
  };
  console.log("tab: ", active);
  return (
    <div className="navBar">
      <div className="container">
        <div className="logo-container" onClick={() => navigate("/")}>
          <img className="logo" src={logo} />
        </div>
        <div className="navigation">
          <ul>
            <li className={active === "home" ? "active" : ""}>
              <a onClick={() => SwitchTab("home", "")}>Home</a>
            </li>
            <li className={active === "about" ? "active" : ""}>
              <a onClick={() => SwitchTab("about", "about")}>About</a>
            </li>
            <li className={active === "subjects" ? "active" : ""}>
              <a onClick={() => SwitchTab("subjects", "subjects")}>Subjects</a>
            </li>
            <li>
              <a href="#">Upgrade</a>
            </li>
            <li>
              <a className="li-btn" href="#">
                Sign up
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default NavBar;
