import "../styles/subjectsPage.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//icons
import mathIco from "../images/math-ico.svg";
import physicsIco from "../images/physics-ico.svg";
import menuIco from "../images/menu.svg";

function SubjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <div className="main-subjects">
        <div>
          <h1>Subjects</h1>
          <h2>There must be a subject that suits your needs.</h2>
        </div>
        <div className="separator" />
        <div className="subject-card-container">
          <div
            className="subject-card"
            onClick={() => navigate("/subjects/maths")}
            style={{
              backgroundImage: `url("https://cdn.jsdelivr.net/gh/liangchuxin/blog-imgs/img/202209250404078.png")`,
            }}
          >
            <div className="subject-icon">
              <img src={mathIco} />
            </div>
            <div className="subject-meta">
              <div className="subject-name">Maths (0580)</div>
              <div className="topics">
                <img src={menuIco} />
                topics
              </div>
            </div>
            <div className="bg-overlay" />
            <div className="displaced-bg" />
          </div>
          <div
            className="subject-card"
            onClick={() => navigate("/subjects/physics")}
            style={{
              backgroundImage: `url("https://cdn.jsdelivr.net/gh/liangchuxin/blog-imgs/img/202209250406678.png")`,
            }}
          >
            <div className="subject-icon">
              <img src={physicsIco} />
            </div>
            <div className="subject-meta">
              <div className="subject-name">Physics (0625)</div>
              <div className="topics">
                <img src={menuIco} />
                topics
              </div>
            </div>
            <div className="bg-overlay" />
            <div className="displaced-bg" />
          </div>
          <div className="main-bg-overlay" />
        </div>
      </div>
      <div className="bg-title">MERAKEY</div>
    </div>
  );
}
export default SubjectsPage;
