import "../styles/searchPage.scss";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import searchIco from "../images/search.svg";
import arrowUpIco from "../images/chevron-up.svg";
import arrowDownIco from "../images/chevron-down.svg";
import userIco from "../images/user.svg";
import clockIco from "../images/clock.svg";
import playIco from "../images/play-circle.svg";
import noStories from "../images/no-stories.png";

function SearchPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { query } = useParams();
  const [queryMain, setQueryMain] = useState(query);
  //query:地址栏
  //queryMain: 自己框
  const mountedRef = React.useRef(true); // ← the "flag"
  // 在传进来的 parameter（即链接变量）改变的时候更新 state
  const [mainTab, setMainTab] = React.useState("games");
  const [tabState, setTabState] = React.useState(true);
  const [rank, setRank] = React.useState("general");
  const [filter, setFilter] = React.useState("100000");
  const [games, setGames] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    setQueryMain(query);
    if (query === undefined || query === null || query === "") {
      console.log("undefined!");
      setQueryMain("");
      getAllGames();
    } else {
      setQueryMain(query);
      searchGames(query);
    }
  }, [query]);
  React.useEffect(() => {
    if (mountedRef.current) {
      mountedRef.current = false;
    } else {
      if (queryMain !== "" && query !== undefined) {
        searchGames(query);
      } else {
        getAllGames();
      }
    }
  }, [rank]);
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${queryMain}`);
    if (queryMain === undefined || queryMain === null || queryMain === "") {
      // 搜索的时候只用看框里是什么就好了，不能判断 query：如果query 是空的，还没来得及换，那么搜什么都会全部显示
      // 加载看地址栏的，搜索看自己框的
      setQueryMain("");
      console.log("undefined!");
      getAllGames();
    } else {
      setQueryMain(queryMain);
      searchGames(queryMain);
    }
  };
  const searchGames = (query) => {
    fetch(`http://localhost:8080/api/games/search/${query}/${rank}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGames(data);
      });
  };
  const getAllGames = () => {
    fetch(`http://localhost:8080/api/games/all/${rank}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGames(data);
      });
  };

  React.useEffect(() => {
    if (mountedRef.current) {
      mountedRef.current = false;
    } else {
      console.log("game: " + games);
    }
  }, [games]);
  console.log();
  function NoStoryFound(props) {
    if (mainTab === "games") {
      var data = props.data;
      console.log("Data: " + data);
      if (!data.length) {
        return (
          <div className="no-stories">
            <img src={noStories} />
          </div>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  return (
    <div className="search-container">
      <div className="results-wrapper">
        <h1>
          <span className="search-title">
            Sea<span className="search-gold">r</span>ch
          </span>
          &nbsp;&nbsp;|&nbsp;&nbsp;Merakey
        </h1>
        <form className="main-search" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="main-search-box"
            onSubmit={(e) => handleSubmit(e)}
            value={queryMain}
            onChange={(event) => setQueryMain(event.target.value)}
            placeholder="Search games and subject topics…"
          ></input>
          <button
            className="main-submit"
            type="button"
            onClick={(e) => handleSubmit(e)}
          >
            <img src={searchIco} />
            Search
          </button>
        </form>
        <div className="filters">
          <div className="filterTabs">
            <ul>
              <li
                className={mainTab === "games" ? "active" : ""}
                onClick={() => setMainTab("games")}
              >
                GAMES 99+<div className="border-bottom"></div>
              </li>
              <li
                className={mainTab === "questions" ? "active" : ""}
                onClick={() => setMainTab("questions")}
              >
                QUESTIONS 99+
              </li>
              <li
                className={mainTab === "genres" ? "active" : ""}
                onClick={() => setMainTab("genres")}
              >
                GENRES
              </li>
              <li
                className={mainTab === "users" ? "active" : ""}
                onClick={() => setMainTab("users")}
              >
                USERS
              </li>
            </ul>
          </div>
          <div
            className={`ranking-btns ${
              mainTab === "games" && tabState ? "show" : ""
            }`}
          >
            <div className="rank-groups">
              <ul className="rank-one">
                <li
                  className={rank === "general" ? "active" : ""}
                  onClick={() => setRank("general")}
                >
                  General
                </li>
                <li
                  className={rank === "views" ? "active" : ""}
                  onClick={() => setRank("views")}
                >
                  most viewed
                </li>
                <li
                  className={rank === "recents" ? "active" : ""}
                  onClick={() => setRank("recents")}
                >
                  most recent
                </li>
                <li
                  className={rank === "plays" ? "active" : ""}
                  onClick={() => setRank("plays")}
                >
                  most played
                </li>
                <li
                  className={rank === "comments" ? "active" : ""}
                  onClick={() => setRank("comments")}
                >
                  most commented
                </li>
              </ul>
              <ul className="rank-two">
                <li
                  className={filter === "100000" ? "active" : ""}
                  onClick={() => setFilter("100000")}
                >
                  General
                </li>
                <li
                  className={filter === "2" ? "active" : ""}
                  onClick={() => setFilter("2")}
                >
                  2 mins
                </li>
                <li
                  className={filter === "5" ? "active" : ""}
                  onClick={() => setFilter("5")}
                >
                  5 mins
                </li>
                <li
                  className={filter === "10" ? "active" : ""}
                  onClick={() => setFilter("10")}
                >
                  10 mins
                </li>
                <li
                  className={filter === "30" ? "active" : ""}
                  onClick={() => setFilter("30")}
                >
                  30 mins
                </li>
                <li
                  className={filter === "60" ? "active" : ""}
                  onClick={() => setFilter("60")}
                >
                  60 mins +
                </li>
              </ul>
            </div>
          </div>
          <div
            className={`hide-filter ${
              mainTab === "games" && tabState ? "show" : ""
            }`}
            onClick={() => setTabState(false)}
          >
            Close filter
            <img src={arrowUpIco} />
          </div>
          <div
            className={`hide-filter ${
              mainTab === "games" && !tabState ? "show" : ""
            }`}
            onClick={() => setTabState(true)}
          >
            Open filter
            <img src={arrowDownIco} />
          </div>
        </div>
        <div
          className={`result-cards-container ${
            mainTab === "games" ? "show" : ""
          }`}
        >
          {games.map((game) => {
            console.log(game.playTime, parseInt(filter) * 60);
            if (game.playTime < parseInt(filter) * 60) {
              return (
                <div
                  className="result-card"
                  key={game.id}
                  onClick={() => navigate(`/games/${game.id}`)}
                >
                  <div className="cover">
                    <img src={game.coverR}></img>
                  </div>
                  <div className="card-descriptions">
                    <span>{game.name}</span>
                    <div className="meta-data">
                      <p className="views">
                        <img src={playIco} />
                        {game.views}
                      </p>
                      <p className="time">
                        <img src={clockIco} />
                        {game.createdAt.split("T")[0]}
                      </p>
                    </div>
                    <div className="meta-data">
                      <p className="author">
                        <img src={userIco} />
                        {/* {game.authorId} */}
                        Cecelia Liang
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <NoStoryFound data={games} tab={mainTab} />
    </div>
  );
}
export default SearchPage;
