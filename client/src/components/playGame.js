import "../styles/playGame.scss";
import { useParams } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import IsLoggedIn, { logout, getCurrentUser } from "./utilities/loginStatus";
import Confetti from "react-confetti";
import progress from "../images/progress.png";
import download from "../images/download.svg";
import downloadPDF from "./downloadWrong";
// import { plott } from "./zzz/plot";
// import { addGame } from "./utilities/addGame";
// import { duck } from "./zzz/donaldDuck";

function PlayGame() {
  const [players, setPlayers] = React.useState(null);
  const [plot, setPlot] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [cover, setCover] = React.useState(null);
  const [played, setPlayed] = React.useState(false);
  const [recordId, setRecordId] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [qsNum, setQsNum] = React.useState(0);
  const [oldScore, setOldScore] = React.useState(0);
  const [oldNum, setOldNum] = React.useState(0);
  const [subject, setSubject] = React.useState(null);
  const [questions, setQuestions] = React.useState([null]);
  const [topicName, setTopicName] = React.useState([null]);
  const { id, topic } = useParams();
  const mountedRef = React.useRef(true); // ← the "flag"

  React.useEffect(() => {
    fetch(`http://localhost:8080/api/games/${id}`)
      .then((res) => res.json())
      .then(async (data) => {
        var plot = JSON.parse(data.plot);
        setPlot(plot);
        setPlayers(data.players);
        setTitle(data.name);
        setCover(data.coverR);
        getQuestions(topic);
        getTopicName(topic);
      });
  }, []);
  // console.log("questions: " + JSON.stringify(questions));

  const getQuestions = async () => {
    fetch(`http://localhost:8080/api/questions/topic/${topic}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setSubject(data[0].subject);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const getTopicName = () => {
    fetch(`http://localhost:8080/api/topics/id/${topic}`)
      .then((response) => response.json())
      .then((data) => {
        setTopicName(data.code + " " + data.name);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // console.log(plot);
  // console.log("Plot", plot);

  React.useEffect(() => {
    if (mountedRef.current) {
      mountedRef.current = false;
    } else {
      console.log("Plot", plot);
      // console.log("first block: " + plot[1]);
      var count = 0;
      // for (var i = 1; i < Object.keys(plot).length; i += 1) {
      //   console.log(plot[i].type);
      // }
      console.log("questions: ", questions);
      for (let i in plot) {
        if (plot[i].type == "question") {
          console.log(plot[i]);
          // qNum 是问题的数量
          var qNum = questions.length;
          var rdQsId = Math.floor(Math.random() * qNum);
          var qs = questions[rdQsId];
          console.log(questions);
          console.log("rdQsId: ", rdQsId);
          questions.splice(rdQsId, 1);
          // console.log("qs: " + JSON.stringify(qs));
          // console.log(questions);
          plot[i].text = qs.question;
          plot[i].correct = qs.correctAns;
          plot[i].explanation = qs.explanation;
          console.log(plot[i]);
        }
      }
    }
  }, [questions]);

  console.log("players: " + players);
  // React.useEffect(() => {
  //   addPlay(players + 1);
  // }, []);

  const addPlay = (playerNum) => {
    const data = { players: playerNum };
    fetch(`http://localhost:8080/api/games/${id}`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const createRecord = (score, end, profile, topic, game) => {
    const data = {
      score: score,
      end: end,
      profileId: profile,
      topicId: topic,
      gameId: game,
    };
    fetch(`http://localhost:8080/api/records/`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success, record is created", data);
        // 到时候如果游戏玩完了要改 end 和分数，可以根据 id 来改（不然找不着记录了）
        setRecordId(data.id);
        console.log("record is set at ", data.id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const modifyRecord = (end) => {
    const data = { id: recordId, score: score, end: end };
    fetch(`http://localhost:8080/api/records/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success, record is modified", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const getUsrInfo = () => {
    fetch(`http://localhost:8080/api/profiles/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOldScore(data.scores);
        setOldNum(data.questions);
      });
  };
  const upUsrInfo = () => {
    var newScore = oldScore + score;
    var newNum = oldNum + qsNum;
    const data = { id: uid, scores: newScore, questions: newNum };
    fetch(`http://localhost:8080/api/profiles`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // React.useEffect(() => {
  //   addGame(plott);
  //   console.log("Game added");
  // }, []);

  const inputRef = React.useRef(null);
  const contentScroll = React.useRef(null);
  React.useEffect(() => {
    inputRef.current.focus();
    var contentBox = document.getElementsByClassName("summary")[0];
    contentBox.scrollTop = contentBox.scrollHeight - contentBox.offsetHeight;
  }, []);
  const scrollToBottom = () => {
    var endPointer = document.getElementById("contentEnd");
    endPointer.scrollIntoView({ behavior: "smooth" });
  };
  // state hooks
  // var pointer = 1;
  const [pointer, setPointer] = useState(1);
  const [content, setContent] = useState("Press Enter to Start.");
  const [placeholder, setPlaceholder] = useState("Enter to continue…");
  const [confetti, setConfetti] = useState(false);

  // get user
  if (getCurrentUser) {
    // console.log(getCurrentUser);
    const username = getCurrentUser.username;
    var email = getCurrentUser.email;
    var uid = getCurrentUser.id;
    var roles = [];
    getCurrentUser.roles.forEach((x, i) =>
      roles.push(x.slice(5).toLowerCase())
    );
    // console.log(roles);
  }

  const calculateProgress = () => {
    if (plot !== null) {
      setProgress((pointer / Object.keys(plot).length) * 100);
    }
  };
  React.useEffect(() => {
    calculateProgress();
  });

  // operations
  const handleKeyDown = (event) => {
    if (played === false) {
      addPlay(players + 1);
      setPlayed(true);
      if (IsLoggedIn()) {
        getUsrInfo();
        createRecord(0, "not done", uid, topic, id);
      }
    }
    console.log("key: " + event.key);
    console.log("pointer: " + pointer);
    console.log("type: " + identifyType(pointer));
    console.log("last plot pointer: " + pointer);
    if (identifyType(pointer) == "story") {
      // 如果是剧情，那么框里啥也不能有
      if (event.key) {
        event.preventDefault();
      }
      // 如果是投票，那么只能是 ABCD
    } else if (identifyType(pointer) == "vote") {
      console.log("Length: " + event.target.value.length);
      if (
        ["A", "B", "C", "D"].indexOf(event.key.toUpperCase()) == -1 ||
        event.target.value.length + 1 > 1
      ) {
        event.preventDefault();
      }
      // 如果是 option，那只能是指定的字母
    } else if (identifyType(pointer) == "option") {
      var options = plot[pointer].options.map((x) => x[0]).flat(2);
      if (
        options.indexOf(event.key.toUpperCase()) == -1 ||
        event.target.value.length + 1 > 1
      ) {
        event.preventDefault();
      }
    }
    // 如果回车，那么执行提交函数
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    } else {
      return false;
    }
  };
  // 输入 Enter 提交后
  const handleSubmit = (e) => {
    setConfetti(false);
    console.log("Submit!");
    console.log("Submitted content is: " + e.target.value);
    console.log("pointer is at: " + pointer, plot[pointer].text);
    if (identifyType(pointer) == "story") {
      setPlaceholder("Enter to continue…");
      console.log("is end?" + plot[pointer].end);
      if (plot[pointer].end === undefined) {
        story(plot[pointer].text, plot[pointer].goto, e);
      } else {
        story(plot[pointer].text, plot[pointer].goto, e, plot[pointer].end);
      }
      // pointer = newAddress(pointer);
    } else if (identifyType(pointer) == "question") {
      setPlaceholder("Input your answer…");
      question(
        plot[pointer].text,
        plot[pointer].correct,
        plot[pointer].explanation,
        plot[pointer].goto,
        e
      );
      e.preventDefault();
    } else if (identifyType(pointer) == "vote") {
      setPlaceholder("Vote someone…");
      vote(
        plot[pointer].text,
        plot[pointer].choices,
        plot[pointer].goto,
        e.target.value
      );
    } else if (identifyType(pointer) == "option") {
      setPlaceholder("Make an option…");
      option(
        plot[pointer].text,
        plot[pointer].options,
        plot[pointer].goto,
        e.target.value
      );
    }
    e.target.value = null;
    scrollToBottom();
  };
  //弄一个读取 key down 的，一个 submit form 的。key down
  //的用于控制用户可以输入什么不可以输入什么；譬如剧情不能打字只能输入"enter"。

  // identify type first
  const identifyType = (pointer) => {
    return plot[pointer].type;
  };

  // self-defined functions
  const story = (text, goto, e, end) => {
    output(text);
    setPointer(goto);
    e.preventDefault();
    // if (pointer == "end") {
    //   setConfetti(true);
    // }
    console.log("end: " + end);
    if (end == "true") {
      setConfetti(true);
    }
    if (IsLoggedIn()) {
      if (end !== null && end !== undefined) {
        modifyRecord(end);
        upUsrInfo();
      }
    }
  };
  const question = (text, correct, explanation, goto, e) => {
    if (e.target.value === "") {
      // console.log("no input yet!");
      output(text);
    } else {
      // output(userinput);
      // console.log("user answer: " + userinput + "correct answer: " + correct);

      var input = e.target.value;
      var correctAnswer = correct;
      // 判断用户回答是否正确
      if (checkAnswer(input, correctAnswer)) {
        addCorrect(text);
        output(input + "\n\nCorrect! Great job! The plot now continues…");
        setConfetti(true);
        setPointer(goto[0]);
        setScore(score + 100);
        toast.warning("SCORES x 100 (temporary)", {
          position: toast.POSITION.BOTTOM_RIGHT,
          icon: "💰",
        });
      } else {
        addWrong(text);
        output(
          input +
            "\n\nYour answer is wrong! The correct answer is: " +
            correct +
            "\n\n" +
            explanation
        );
        setPointer(goto[1]);
      }
      setQsNum(qsNum + 1);
      setPlaceholder("Enter to continue…");
      e.preventDefault();
    }
  };
  const vote = (text, choices, goto, userinput) => {
    if (userinput === "") {
      output(text);
    } else {
      var input = userinput;
      input = input.toUpperCase();
      var choiceIndex;
      switch (input) {
        case "A":
          choiceIndex = 0;
          break;
        case "B":
          choiceIndex = 1;
          break;
        case "C":
          choiceIndex = 2;
          break;
        case "D":
          choiceIndex = 3;
          break;
      }
      output("You voted [" + input + "]" + choices[choiceIndex]);
      setPointer(goto[choiceIndex]);
    }
    setPlaceholder("Enter to continue…");
  };
  const option = (text, optionGroups, goto, userinput) => {
    if (userinput === "") {
      output(text);
    } else {
      var input = userinput;
      input = input.toUpperCase();
      var options = plot[pointer].options.map((x) => x[0]).flat(2);
      var optionIndex = options.indexOf(input);
      console.log("optionIndex: " + optionIndex);
      console.log("optionGroups: " + optionGroups);
      output("Your option is [" + input + "]" + optionGroups[optionIndex][1]);
      setPointer(goto[optionIndex]);
      console.log("setPointer: " + goto[optionIndex]);
    }
    setPlaceholder("Enter to continue…");
  };
  const newAddress = (pointer) => {
    var newAddress = plot[pointer].goto;
    return newAddress;
  };
  const checkAnswer = (userInput, correctAnswer) => {
    if (userInput === correctAnswer) {
      return true;
    } else {
      return false;
    }
  };

  function ShowConfetti(props) {
    const confetti = props.confetti;
    if (confetti) {
      return (
        <Confetti
          recycle={false}
          initialVelocityY={-20}
          numberOfPieces={100}
          colors={["#F7CF56", "#D0D0D0", "#282828"]}
        />
      );
    } else {
      return null;
    }
  }

  const addCorrect = (question) => {
    setQHistory(qHistory.concat([[question, "correct"]]));
  };

  const addWrong = (question) => {
    setQHistory(qHistory.concat([[question, "wrong"]]));
  };

  const [qHistory, setQHistory] = useState([]);

  // detail ones
  const output = (text) => {
    setContent(content + "\n\n" + text);
  };

  return (
    <div className="playGame">
      <ShowConfetti confetti={confetti} />
      <ToastContainer autoClose={2000} theme="dark" transition={Slide} />
      <div className="chapters">
        {cover != null && <img className="cover" src={cover} />}

        <h3 className="game-title">{title}</h3>
        <div className="game-info">
          <p>
            <span>Subject</span>
            &nbsp;{subject}
          </p>
          <p>
            <span>&nbsp;&nbsp;Topic&nbsp;&nbsp;</span>
            &nbsp;{topicName}
          </p>
        </div>
        <div className="current-info">
          <p title="You will receive your scores once the game reaches an end.">
            Temporary score: {score}
          </p>
          <p title="Right or wrong…">Question answered: {qsNum}</p>
        </div>
      </div>
      <div className="story">
        <div className="progress-container">
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>
        <p className="summary">
          <br />
          <br />
          <br />

          <br />
          {content + "\n\n\n\n\n\n\n"}
          <span id="contentEnd"></span>
        </p>
        <form>
          <input
            className="input"
            placeholder={placeholder}
            onKeyPress={handleKeyDown}
            ref={inputRef}
          />
        </form>
      </div>
      <div className="questions">
        <div className="history">
          <h3>History</h3>
          {qHistory.map((questionText) => {
            if (questionText[1] == "correct") {
              return (
                <div
                  className="question-container correct"
                  key={questionText[0]}
                >
                  {questionText[0]}
                </div>
              );
            } else {
              console.log("Question text: " + questionText);
              return (
                <div className="question-container wrong" key={questionText[0]}>
                  {questionText[0]}
                </div>
              );
            }
          })}
        </div>
        <div className="wrong-questions">
          <h3>Wrong answers</h3>
          <div className="download-box" onClick={() => downloadPDF(qHistory)}>
            <img src={download} />
            Download Questions
          </div>
          {qHistory.map((questionText) => {
            if (questionText[1] == "wrong") {
              return (
                <div className="question-container wrong" key={questionText[0]}>
                  {questionText[0]}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
export default PlayGame;
