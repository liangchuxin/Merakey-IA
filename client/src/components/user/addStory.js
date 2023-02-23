import IsLoggedIn, { logout, getCurrentUser } from "../utilities/loginStatus";
import SecondSide from "./secondSide";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/addStory.scss";

function AddStory() {
  function RecommendedTag({ tagName }) {
    var tagBox = document.getElementById("game-tags");
    const addTag = (tagName) => {
      var tagBox = document.getElementById("game-tags");
      tagBox.value += `${tagName}, `;
    };
    return <span onClick={() => addTag(tagName)}>{tagName}</span>;
  }
  const addGame = (game) => {
    axios
      .post("http://localhost:8080/api/games/", game)
      .then((response) => {
        console.log(response);
        toast.success("Game is created successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
          onClose: () =>
            (window.location.href = "http://localhost:8000/user/games"),
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  function CheckImage(url, fieldName) {
    return new Promise((resolve, reject) => {
      var image = new Image();
      image.onload = function () {
        if (this.width > 0) {
          // console.log("image exists");
          resolve(true);
        }
      };
      image.onerror = function () {
        // console.log("image doesn't exist");
        toast.error(fieldName + " URL is invalid!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        resolve(false);
      };
      image.src = url;
    });
  }
  const [type, setType] = React.useState(null);
  const [jsonStatus, setJsonStatus] = React.useState(null);
  React.useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);
  }, []);
  if (getCurrentUser) {
    console.log(getCurrentUser);
    var id = getCurrentUser.id;
    var roles = [];
    getCurrentUser.roles.forEach((x, i) =>
      roles.push(x.slice(5).toLowerCase())
    );
    console.log(roles);
  }
  const [playTime, setPlayTime] = React.useState(null);
  const submitJSON = () => {
    var jsonText = document.getElementById("jsonText").value;
    try {
      var parsedJSON = eval("(" + jsonText + ")");
      setPlayTime(Object.keys(parsedJSON).length * 10);
      setJsonStatus(true);
    } catch (SyntaxError) {
      toast.error("The JSON submitted is invalid!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setJsonStatus(false);
      return false;
    }
  };
  const submitGame = async (published) => {
    if (jsonStatus) {
      var title = document.getElementById("game-title").value;
      if (title) {
        var coverHome = document.getElementById("home-cover").value;
        CheckImage(coverHome, "Home cover").then(async (exists) => {
          if (exists) {
            console.log("success");
            var coverWide = document.getElementById("wide-cover").value;
            CheckImage(coverWide, "Wide cover").then(async (exists) => {
              if (exists) {
                if (!type) {
                  toast.error("Type of game not chosen!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                }
                if (type == "other") {
                  if (!document.getElementById("source-url").value) {
                    toast.error("Source not inputted!", {
                      position: toast.POSITION.BOTTOM_RIGHT,
                    });
                  }
                }
                var tags = document.getElementById("game-tags").value;
                var jsonText = document.getElementById("jsonText").value;
                var parsedJSON = eval("(" + jsonText + ")");
                var description =
                  document.getElementById("source-url").value +
                  "\n-\n" +
                  document.getElementById("game-desc").value;
                var game = {
                  name: title,
                  coverR: coverHome,
                  coverW: coverWide,
                  published: published,
                  tags: tags,
                  description: description,
                  plot: JSON.stringify(parsedJSON),
                  authorId: id,
                };
                console.log(game);
                console.log(parsedJSON);
                addGame(game);
              }
            });
          }
        });
      } else {
        toast.error("Please input a title!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } else {
      toast.error("Valid JSON not submitted!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const secToMin = (sec) => {
    return Math.round((sec / 60) * 10) / 10;
  };
  const clickTag = (e) => {};
  return (
    <>
      <SecondSide />
      <section class="user-main">
        <div className="addStory">
          <ToastContainer autoClose={1000} theme="dark" transition={Slide} />
          <h2>
            <img />
            Add a Game
          </h2>
          <textarea
            id="jsonText"
            placeholder="Please input json…"
            rows="15"
            spellcheck="false"
          ></textarea>
          <div className="submit-container">
            <div className="submit-btn" onClick={() => submitJSON()}>
              Submit JSON
            </div>
            <p className="time-message">
              Estimated maximum play time:{" "}
              {playTime !== null ? `${secToMin(playTime)} minutes` : `N/A`}
            </p>
          </div>
          <div className="game-attributes">
            <h3>Game Settings</h3>
            <div className="attribute-single title-set">
              <div>
                <div className="h4-set">
                  <h4>Title*</h4>
                </div>
                <div className="input-container">
                  <input
                    id="game-title"
                    className="setting-field"
                    placeholder="Please input the name of the game…"
                  />
                </div>
              </div>
            </div>
            <div className="attribute-single cover-set">
              <div>
                <div className="h4-set">
                  <h4>Cover*</h4>
                </div>
                <div className="input-container">
                  <input
                    id="home-cover"
                    className="setting-field"
                    placeholder="Please input url for game cover (for homepage)…"
                  />
                </div>
              </div>
            </div>
            <div className="attribute-single cover-set">
              <div>
                <div className="h4-set">
                  <h4>Wide Cover</h4>
                </div>
                <div className="input-container">
                  <input
                    id="wide-cover"
                    className="setting-field"
                    placeholder="Please input url for game cover (for details page)…"
                  />
                </div>
              </div>
            </div>
            <div className="attribute-single">
              <div>
                <div className="h4-set">
                  <h4>Type*</h4>
                </div>
                <div className="input-container">
                  <select
                    id="type"
                    name="status"
                    onChange={() =>
                      setType(document.getElementById("type").value)
                    }
                  >
                    <option value="none">== Choose Type ==</option>
                    <option value="self">{`🙋 Self-made`}</option>
                    <option value="other">{`🔗 Other sources`}</option>
                  </select>
                  {type == "other" && (
                    <input
                      id="source-url"
                      className="setting-field"
                      placeholder="Please input url for the original source of the game"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="attribute-single tags-set">
              <div>
                <div className="h4-set">
                  <h4>Tags</h4>
                </div>
                <div className="input-container">
                  <input
                    className="setting-field"
                    id="game-tags"
                    placeholder="Please input tags for game (separated with English comma)"
                  />
                </div>
              </div>
              <div>
                <p>
                  Recommended tags: <RecommendedTag tagName="humor" />
                  <RecommendedTag tagName="horror" />
                  <RecommendedTag tagName="romance" />
                  <RecommendedTag tagName="fantasy" />
                  <RecommendedTag tagName="random" />
                </p>
              </div>
            </div>
            <div className="attribute-single desc-set">
              <div>
                <div className="h4-set">
                  <h4>Description</h4>
                </div>
                <div className="input-container">
                  <textarea
                    id="game-desc"
                    rows="8"
                    className="setting-field"
                    placeholder="This will be the best game on Merakey ever…"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="btn-container">
            <div class="submit-btn" onClick={() => submitGame(false)}>
              Save as Draft
            </div>
            {roles.includes("moderator") ? (
              <div
                class="submit-btn submit-game"
                onClick={() => submitGame(true)}
              >
                Submit Game Now
              </div>
            ) : roles.includes("admin") ? (
              <div
                class="submit-btn submit-game"
                onClick={() => submitGame(true)}
              >
                Submit Game Now
              </div>
            ) : (
              <div class="submit-btn submit-game">Submit Game for Review</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
export default AddStory;
