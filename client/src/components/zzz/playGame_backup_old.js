import "../styles/playGame.scss";
import React, { useState } from "react";
import jsxToString from "jsx-to-string";
import progress from "../images/progress.png";
import download from "../images/download.svg";

function PlayGame() {
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

  const plot = [
    "On a dark and gloomy Tuesday evening, there was a loud thud that echoed throughout the barn.",
    "Donald Duck laid there, dead on the floor. One of them did it, but we don't know who.",
    [
      "A",
      "answer",
      "Vote Celia, Sivana, Thao, or Sascha. Who is the murderer of Donald Duck? *please use capital letters*",
      ["Celia", "Sivana", "Thao", "Sascha"],
      [1, 2, 3, 4],
    ],
    ["Plot after vote…"],
  ];
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [content, setContent] = useState(plot[0]);
  const [current, setCurrent] = useState(1);
  const [placeholder, setPlaceholder] = useState("Enter to continue…");
  const [status, setStatus] = useState("plot");
  const [nextAddress, setNextAddress] = useState("");
  const next = (e) => {
    setAnswer(e.target.value);
  };
  const checkNextType = (plot) => {
    if (typeof plot == "string") {
      setStatus("plot");
    } else {
      setStatus(plot[1]);
    }
  };
  // 检查答案
  const checkAnswer = (plot) => {
    console.log("plot: " + plot);
    var correct = plot[3][0];
    var choices = plot[3];
    console.log("correct: " + correct);
    console.log("choices: " + choices);
    output(answer);
    if (answer == correct) {
      output("Correct! Please enter to continue…");
      setStatus("plot");
      setCurrent(current + 1);
    } else if (choices.indexOf(answer) > -1) {
      output("Wrong answer!");
    } else {
      output("Answer not in choices.");
    }
  };
  // current 是现在的指针，next 是下个的地址
  const findNext = (current, next) => {
    var step = 1;
    while (true) {
      if (plot[current + step][0] == next) {
        break;
      }
      step += 1;
    }
    return step;
  };
  // 根据选项前往地址
  const goToChoice = (plot) => {
    console.log("plot: " + plot);
    var choices = plot[3];
    var addresses = plot[4];
    var next;
    output(answer);
    for (var index = 0; index < choices.length; index++) {
      if (answer == choices[index]) {
        next = addresses[index];
        break;
      }
    }
    return next;
  };
  const output = (text) => {
    setContent(content + "\n\n" + text);
  };
  const handleSubmit = (e) => {
    // var contentBox = document.getElementsByClassName("summary")[0];
    // contentBox.scrollTop = contentBox.scrollHeight - contentBox.offsetHeight;
    console.log("Current status: " + status);
    e.preventDefault();
    setSubmitted(answer);
    setAnswer("");
    console.log("current: " + current);
    console.log("submitted: " + submitted);
    console.log("answer: " + answer);
    // if (status != "answer" && status != "start answer") {
    //   setCurrent(current + 1);
    //   if (plot[current + 1]) {
    //     checkNextType(plot[current + 1]);
    //   }
    // }
    if (nextAddress != "") {
      setCurrent();
    }
    if (status == "plot") {
      output(plot[current][2]);
      setCurrent(current + 1);
    } else if (status == "answer") {
      output(plot[current][2]);
      setStatus("start answer");
    } else if (status == "start answer") {
      checkAnswer(plot[current]);
      setNextAddress(findNext(current, goToChoice(plot[current])));
    } else if (status == "choose") {
    }
    // } else {
    //   // if there are content in input box, print content
    //   output(answer);
    // }
    // contentBox.scrollTop = contentBox.scrollHeight - contentBox.offsetHeight;
    scrollToBottom();
  };
  return (
    <div className="playGame">
      <div className="chapters">
        <p className="lv0">{"<"} Back to home</p>
        <p className="lv1">Chapter 1</p>
        <p className="lv2">The fireworks</p>
        <p className="lv2">A strange sound</p>
        <p className="lv1">Chapter 2</p>
      </div>
      <div className="story">
        <img src={progress} />
        <p
          className="summary"
          style={{ whiteSpace: "pre-line", overFlow: "scroll" }}
        >
          <br />
          <br />
          <br />
          <b>Chapter 1</b> <br />
          <br />
          {content}
          <span id="contentEnd"></span>
        </p>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder={placeholder}
            // onChange={next}
            value={answer}
            ref={inputRef}
          />
        </form>
      </div>
      <div className="questions">
        <div className="history">
          <h3>History</h3>
          <div className="question-container correct">
            1. What is the gradient of y=x?
          </div>
          <div className="question-container wrong">
            2. What is the gradient of y=4x-6?
          </div>
        </div>
        <div className="wrong-questions">
          <h3>Wrong answers</h3>
          <div className="download-box">
            <img src={download} />
            Download PDF
          </div>
          <div className="question-container wrong">
            2. What is the gradient of y=4x-6?
          </div>
        </div>
      </div>
    </div>
  );
}
export default PlayGame;
