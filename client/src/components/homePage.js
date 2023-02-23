import "../styles/homePage.scss";
import leaderboard from "../images/leaderboard.png";
import reload from "../images/refresh-cw.svg";
import storyList from "../images/free-and-premium.png";
import React, { useEffect, useCallback, useMemo } from "react";
import gold from "../images/gold.png";
import silver from "../images/silver.png";
import bronze from "../images/bronze.png";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const defaultCover =
    "https://cdn.jsdelivr.net/gh/liangchuxin/blog-files/img/20210607224729.png";
  const mountedRef = React.useRef(true); // ← the "flag"
  const [recent, setRecent] = React.useState(undefined);
  const [recentRandom, setRecentRandom] = React.useState([]);
  const [covers, setCovers] = React.useState(Array(6).fill(defaultCover));
  const [leaderboard, setLeaderboard] = React.useState([]);
  const Grid = ({ num }) => {
    return (
      <div
        className="card story-card"
        style={{ backgroundImage: `url("${covers[num]}")` }}
        onClick={() => navigate(`/games/${recentRandom[num][0]}`)}
      ></div>
    );
  };

  const getRecent = () => {
    fetch(`http://localhost:8080/api/games/recent/10`)
      .then((res) => res.json())
      .then((data) => {
        const recents = [];
        for (var i = 0; i < data.length; i++) {
          recents.push([data[i].id, data[i].coverR]);
        }
        setRecent(recents);
        return;
      });
  };
  function GetGame(id) {
    const response = fetch(`http://localhost:8080/api/games/meta/${id}`)
      .then((res) => {
        if (res.status === 404) {
          return {
            name: "Unavailable",
            description: "N/A",
            coverR:
              "https://m.media-amazon.com/images/I/11f6LubgRmL._SY498_BO1,204,203,200_.jpg",
            createdAt: "0000-00-00T03:05:06.000Z",
            playTime: 180,
          };
        }
        return res.json();
      })
      .then((data) => {
        return data.name;
      });
    return response;
  }
  const getLeaderboard = async () => {
    fetch(`http://localhost:8080/api/profiles/board/top`)
      .then((res) => res.json())
      .then(async (data) => {
        for (let index = 0; index < data.length; index++) {
          if (data[index].records.length > 0) {
            data[index].gameName = await GetGame(data[index].records[0].gameId);
          } else {
            data[index].gameName = "Unavailable";
          }
        }
        setLeaderboard(data);
        return;
      });
  };
  React.useEffect(() => {
    getRecent();
    getLeaderboard();
  }, []);
  const shuffleGames = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };
  React.useEffect(() => {
    if (mountedRef.current === false) {
      var array = shuffleGames(recent, 6);
      setRecentRandom(array);
    }
  }, [recent]);

  React.useEffect(() => {
    if (mountedRef.current) {
      mountedRef.current = false;
    } else {
      if (recentRandom) {
        var covers = new Array(6);
        for (let i = 0; i < covers.length; i += 1) {
          covers[i] = recentRandom[i][1];
        }
        setCovers(covers);
      }
    }
  }, [recentRandom]);

  React.useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);
  }, []);

  const getDate = (date) => {
    const recordDate = new Date(date);
    const seconds = Math.floor((new Date() - recordDate) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + " yr" + (interval === 1 ? "" : "s");
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " mo" + (interval === 1 ? "" : "s");
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " d" + (interval === 1 ? "" : "s");
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hr" + (interval === 1 ? "" : "s");
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " min" + (interval === 1 ? "" : "s");
    }
    return Math.floor(seconds) + " second" + (seconds === 1 ? "" : "s");
  };

  const navigate = useNavigate();
  var topId = 12;
  var cardIds = [1, 3, 4, 5, 6, 7];
  return (
    <div className="homePage">
      <div className="main-home">
        <div className="leaderboard-container">
          <h3>
            <span>Leader</span>board
          </h3>
          <div className="leaderboard">
            {/* <img src={leaderboard} /> */}
            <table>
              <tr
                style={{
                  backgroundColor: `rgba(20, 20, 20, 0.78)`,
                  fontWeight: 600,
                  fontSize: `13px`,
                }}
              >
                <td>#</td>
                <td>Nickname</td>
                <td>Score</td>
                <td style={{ paddingLeft: `7px` }}>Questions</td>
                <td>Last Game</td>
                <td style={{ color: `white` }}>Time Ago</td>
              </tr>
              <tr>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
              </tr>
              {leaderboard[0] !== null &&
                leaderboard.map((profile, key) => {
                  return (
                    <tr>
                      <td>{key + 1}</td>
                      <td>
                        {key == 0 && (
                          <img src={gold} height="auto" width="5px"></img>
                        )}
                        {key == 1 && (
                          <img src={silver} height="auto" width="5px"></img>
                        )}
                        {key == 2 && (
                          <img src={bronze} height="auto" width="5px"></img>
                        )}
                        {profile.displayName}
                      </td>
                      <td>{profile.scores.toLocaleString()}</td>
                      <td>{profile.questions}</td>
                      <td>{profile.gameName}</td>
                      <td>
                        {profile.records.length > 0
                          ? getDate(profile.records[0].createdAt)
                          : "N/A"}
                      </td>
                      {/* <td>{profile.records[0].createdAt}something</td> */}
                    </tr>
                  );
                })}
              <tr>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="new-feed">
          <div>
            <div>
              <div
                className="story-wide story-card"
                style={{
                  backgroundImage: `url(
                    "https://cdn.jsdelivr.net/gh/liangchuxin/blog-imgs/img/202209022318918.png"
                  )`,
                }}
                onClick={() => navigate(`/games/${topId}`)}
              ></div>
              <div className="story-grid">
                <Grid num={0} />
                <Grid num={1} />
                <Grid num={2} />
              </div>
              <div className="story-grid">
                <Grid num={3} />
                <Grid num={4} />
                <Grid num={5} />
              </div>
              <button className="story-card" onClick={() => getRecent()}>
                <img src={reload} /> Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="free-and-premium">
        <img src={storyList} />
      </div>
    </div>
  );
}
export default HomePage;
