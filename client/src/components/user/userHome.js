import IsLoggedIn, { logout, getCurrentUser } from "../utilities/loginStatus";
import "./styles/userHome.scss";
import SecondSide from "./secondSide";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// icons
import h2Clock from "./icons/h2-clock.svg";
import panelStatS from "./icons/panel-stat-s.svg";
import panelStatL from "./icons/panel-stat-l.svg";
import panelEditS from "./icons/panel-edit-s.svg";
import panelEditL from "./icons/panel-edit-l.svg";
import panelAwardS from "./icons/panel-award-s.svg";
import panelAwardL from "./icons/panel-award-l.svg";
import arrowIco from "./icons/arrow-right.svg";

function UserHome() {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [records, setRecords] = React.useState([]);
  const [avatar, setAvatar] = React.useState(
    "https://cdn.jsdelivr.net/gh/liangchuxin/blog-imgs/img/202209210118002.png"
  );
  const [scores, setScores] = React.useState(0);
  const [qsNum, setQsNum] = React.useState(0);
  const getUser = (userId) => {
    fetch(`http://localhost:8080/api/profiles/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAvatar(data.avatar);
        setName(data.displayName);
        setScores(data.scores);
        setQsNum(data.questions);
      });
  };
  const getCurrentDate = () => {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var d = new Date();
    var month = months[d.getMonth()];
    var date = d.getDate();
    var year = d.getFullYear();
    return `${month.toUpperCase()} ${date}, ${year}`;
  };

  function GetGame(id, field) {
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
        switch (field) {
          case "cover":
            return JSON.stringify(data.coverR);
          case "name":
            return data.name;
          case "desc":
            return data.description;
        }
      });
    return response;
  }
  const convertEnd = (end) => {
    switch (end) {
      case "not done":
        return end.charAt(0).toUpperCase() + end.slice(1);
      case "happy":
        return "Happy End";
      case "bad":
        return "Bad End";
      case "true":
        return "True End";
      default:
        return "undentified";
    }
  };

  function GetTopic(topicId) {
    const response = fetch(`http://localhost:8080/api/topics/id/${topicId}`)
      .then((res) => res.json())
      .then((data) => {
        return data.code + " " + data.name;
      });
    return response;
  }
  function GetSubject(topicId) {
    const response = fetch(`http://localhost:8080/api/topics/id/${topicId}`)
      .then((res) => res.json())
      .then((data) => {
        return data.subject;
      });
    return response;
  }

  const getDate = (d, type) => {
    // sqlDate = Date.parse(sqlDate);
    let jsDate = new Date(d);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var month = months[jsDate.getMonth()];
    var hr = jsDate.getHours();
    var min = jsDate.getMinutes();
    if (min < 10) {
      min = "0" + min;
    }
    var ampm = "AM";
    if (hr > 12) {
      hr -= 12;
      ampm = "PM";
    }
    var date = jsDate.getDate();
    var year = jsDate.getFullYear();
    if (type == "date") {
      return `${date} ${month} ${year}`;
    } else if (type == "time") {
      return `${hr}:${min} ${ampm}`;
    } else {
      return "Wrong type.";
    }
  };
  const getRecords = async (userId) => {
    fetch(`http://localhost:8080/api/records/${userId}/5`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        var records = data;
        for (let index = 0; index < records.length; index++) {
          var game = records[index].gameId;
          records[index].cover = await GetGame(game, "cover");
          records[index].gameName = await GetGame(game, "name");
          records[index].gameDesc = await GetGame(game, "desc");
          records[index].topicName = await GetTopic(data[index].topicId);
          records[index].subject = await GetSubject(data[index].topicId);
        }
        setRecords(records);
      });
  };

  if (getCurrentUser) {
    console.log(getCurrentUser);
    var username = getCurrentUser.username;
    var email = getCurrentUser.email;
    var id = getCurrentUser.id;
    var roles = [];
    getCurrentUser.roles.forEach((x, i) =>
      roles.push(x.slice(5).toLowerCase())
    );
    console.log(roles);
  }
  React.useEffect(() => {
    getUser(id);
    getRecords(id);
  }, []);
  React.useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);
  }, []);
  var date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const year = console.log("avatar: " + avatar);

  return (
    <>
      <SecondSide />
      <section className="user-main">
        <div className="main-container">
          <div className="date">{getCurrentDate()}</div>
          <div className="greeting">
            Hello<span>,</span> {name}!
          </div>
          <div className="data-panels">
            <div className="panel purple">
              <img className="ico" src={panelStatS} />
              <span className="title">Total Score</span>
              <span className="num">{scores.toLocaleString()}</span>
              <img className="bg" src={panelStatL} />
            </div>
            <div className="panel green">
              <img className="ico" src={panelEditS} />
              <span className="title">Questions Answered</span>
              <span className="num">{qsNum.toLocaleString()}</span>
              <img className="bg" src={panelEditL} />
            </div>
            <div className="panel red">
              <img className="ico" src={panelAwardS} />
              <span className="title">Global Rank</span>
              <span className="num">10</span>
              <img className="bg" src={panelAwardL} />
            </div>
          </div>
          <h2>
            <img src={h2Clock} />
            <span>Game History</span>
          </h2>
          <div className="subject-block">
            {records.length != 0 ? (
              records.map((record) => (
                <div className="game-history">
                  <div
                    className="his-cover-container"
                    onClick={() => navigate(`/games/${record.gameId}`)}
                  >
                    <img src={JSON.parse(record.cover)} />
                  </div>
                  <div
                    className="story-meta"
                    onClick={() => navigate(`/games/${record.gameId}`)}
                  >
                    <div className="name">{record.gameName}</div>
                    <div className="desc">{record.gameDesc}</div>
                  </div>
                  <div className="qs-meta">
                    <div className="time">{record.subject.toUpperCase()}</div>
                    {/* <div className="date">12 Dec 2022</div> */}
                    <div className="date">{record.topicName}</div>
                  </div>
                  <div className="time-meta">
                    <div className="time">
                      {getDate(Date.parse(record.createdAt), "time")}
                    </div>
                    {/* <div className="date">12 Dec 2022</div> */}
                    <div className="date">
                      {getDate(Date.parse(record.createdAt), "date")}
                    </div>
                  </div>
                  <div className="perf-meta">
                    <div className="points">{record.score} pts</div>
                    {/* <div className="end">True End</div> */}
                    <div className="end">{convertEnd(record.end)}</div>
                  </div>
                  <div
                    className="replay-btn"
                    onClick={() => navigate(`/games/${record.gameId}`)}
                  >
                    Play Again
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  color: `#626262`,
                  marginBottom: `29px`,
                  fontFamily: `poppins`,
                }}
              >
                Σ( ° △ °|||)︴ You don't have gaming records!
              </div>
            )}
          </div>
          {/* <div className="subject-block">
            <h3>Maths</h3>
            <div className="game-history">
              <div className="his-cover-container"></div>
              <div className="story-meta">
                <div className="name">The Child</div>
                <div className="desc">
                  Children in your village do not go to school, for most of…
                </div>
              </div>
              <div className="time-meta">
                <div className="time">11:30 AM</div>
                <div className="date">12 Dec 2022</div>
              </div>
              <div className="perf-meta">
                <div className="points">373 pts</div>
                <div className="end">True End</div>
              </div>
              <div className="replay-btn">Play Again</div>
            </div>
            <div className="game-history">
              <div className="his-cover-container"></div>
              <div className="story-meta">
                <div className="name">The Child</div>
                <div className="desc">
                  Children in your village do not go to school, for most of…
                </div>
              </div>
              <div className="time-meta">
                <div className="time">11:30 AM</div>
                <div className="date">12 Dec 2022</div>
              </div>
              <div className="perf-meta">
                <div className="points">373 pts</div>
                <div className="end">True End</div>
              </div>
              <div className="replay-btn">Play Again</div>
            </div>
          </div>
          <div className="subject-block">
            <h3>Physics</h3>
            <div className="game-history">
              <div className="his-cover-container"></div>
              <div className="story-meta">
                <div className="name">The Child</div>
                <div className="desc">
                  Children in your village do not go to school, for most of…
                </div>
              </div>
              <div className="time-meta">
                <div className="time">11:30 AM</div>
                <div className="date">12 Dec 2022</div>
              </div>
              <div className="perf-meta">
                <div className="points">373 pts</div>
                <div className="end">True End</div>
              </div>
              <div className="replay-btn">Play Again</div>
            </div>
            <div className="game-history">
              <div className="his-cover-container"></div>
              <div className="story-meta">
                <div className="name">The Child</div>
                <div className="desc">
                  Children in your village do not go to school, for most of…
                </div>
              </div>
              <div className="time-meta">
                <div className="time">11:30 AM</div>
                <div className="date">12 Dec 2022</div>
              </div>
              <div className="perf-meta">
                <div className="points">373 pts</div>
                <div className="end">True End</div>
              </div>
              <div className="replay-btn">Play Again</div>
            </div>
          </div> */}
        </div>
        {records.length != 0 && (
          <div
            className="view-all-btn"
            onClick={() => navigate("/user/history")}
          >
            View More <img src={arrowIco} />
          </div>
        )}
        <div className="bg-overlay" />
      </section>
    </>
  );
}
export default UserHome;
