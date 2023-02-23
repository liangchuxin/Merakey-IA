import SecondSide from "./secondSide";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import IsLoggedIn, { logout, getCurrentUser } from "../utilities/loginStatus";
import { useNavigate, useParams } from "react-router-dom";
import clockIco from "../../images/clock.svg";
import playIco from "../../images/play-circle.svg";
import dotsIco from "../../images/vertical-dots.svg";
import "./styles/yourGames.scss";
import { ToastContainer, toast, Slide } from "react-toastify";

function YourGames() {
  const navigate = useNavigate();
  React.useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);
    getGames(id);
  }, []);
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

  function copyLink(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => console.log("Copied to clipboard"))
      .catch((error) => console.error("Error copying to clipboard: ", error));
  }
  const closeMenu = () => {
    const cardMenu = document.getElementsByClassName("menu-placeholder")[0];
    ReactDOM.unmountComponentAtNode(cardMenu);
    document.body.style.overflow = "auto";
  };
  const revertToDraft = (id) => {
    const data = { published: false };
    fetch(`http://localhost:8080/api/games/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toast.success("Game reverted to draft.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          onClose: () => document.location.reload(),
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(error, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
  const publishGame = (id) => {
    const data = { published: true };
    fetch(`http://localhost:8080/api/games/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toast.success("Your game is published!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          onClose: () => document.location.reload(),
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(error, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
  const deleteGame = (id) => {
    if (window.confirm("Are you sure you want to delete this game?")) {
      // User clicked OK
      // Execute your delete code here
      fetch(`http://localhost:8080/api/games/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          toast.success("Your game is deleted!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            onClose: () => document.location.reload(),
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error(error, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });
    }
    closeMenu();
  };
  function useOutsideAlerter(ref) {
    React.useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          closeMenu();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const [games, setGames] = React.useState([]);
  const [tabState, setTabState] = React.useState("all");
  const getGames = (userId) => {
    fetch(`http://localhost:8080/api/profiles/games/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGames(data.games);
      });
  };

  const showMenu = (event, game) => {
    var { clientX, clientY } = event;
    console.log("X: ", clientX, "Y: ", clientY);
    document.body.style.overflow = "hidden";
    if (clientY + 180 > window.innerHeight) {
      clientY = window.innerHeight - 120 - 60;
    }
    if (clientX + 15 + 170 > window.innerWidth) {
      clientX = window.innerWidth - 145;
    }
    console.log("Y: ", clientY);
    ReactDOM.render(
      <div
        className="card-menu"
        ref={wrapperRef}
        style={{ top: clientY + 15, left: clientX - 30 }}
      >
        <a
          onClick={() => {
            navigate("/user/edit/" + game.id);
            closeMenu();
          }}
        >
          Edit game
        </a>
        {game.published && (
          <a onClick={() => revertToDraft(game.id)}>Revert to draft</a>
        )}
        {!game.published && (
          <a onClick={() => publishGame(game.id)}>Publish game</a>
        )}
        <a onClick={() => deleteGame(game.id)}>Delete game</a>
        <a
          onClick={() => {
            copyLink("http://localhost:8000/games/" + game.id);
            closeMenu();
            toast.success("URL is copied to clipboard!", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }}
        >
          Share game
        </a>
      </div>,
      document.getElementsByClassName("menu-placeholder")[0]
    );
  };
  function renderGameCard(game) {
    return (
      <div className="game-card" key={game.id}>
        <div className="cover" onClick={() => navigate(`/games/${game.id}`)}>
          <img src={game.coverR} />
        </div>
        <div className="card-descriptions">
          <div
            className="menu-container"
            onClick={function (event) {
              showMenu(event, game);
            }}
          >
            <img src={dotsIco} />
          </div>
          <div className="menu-placeholder"></div>
          <span onClick={() => navigate(`/games/${game.id}`)}>
            {!game.published && "[draft] "}
            {game.name}
          </span>

          <div
            className="meta-data"
            onClick={() => navigate(`/games/${game.id}`)}
          >
            <p className="views">
              <img src={playIco} />
              {game.views}
            </p>
            <p className="time">
              <img src={clockIco} />
              {game.createdAt.split("T")[0]}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <SecondSide />
      <section className="user-main">
        <ToastContainer autoClose={2000} theme="dark" transition={Slide} />
        <div className="title-container">
          <h2>Your Games ({games.length})</h2>
          <div className="menu">
            <ul>
              <li
                className={`tab ${tabState == "all" && "active"}`}
                onClick={() => setTabState("all")}
              >
                All
              </li>
              <li
                className={`tab ${tabState == "published" && "active"}`}
                onClick={() => setTabState("published")}
              >
                Published
              </li>
              <li
                className={`tab ${tabState == "drafts" && "active"}`}
                onClick={() => setTabState("drafts")}
              >
                Drafts
              </li>
            </ul>
          </div>
        </div>
        <div className="games-container">
          {games.map((game) =>
            tabState == "published"
              ? game.published == true && renderGameCard(game)
              : tabState == "drafts"
              ? game.published == false && renderGameCard(game)
              : renderGameCard(game)
          )}
        </div>
      </section>
    </>
  );
}
export default YourGames;
