import "../styles/playGame.scss";
import React, { useState } from "react";
// import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
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
  // plot dictionary
  var explainGradients =
    'Gradient of a linear equation is the number before "x".';
  var plot = {
    // create a dictionary called plot with Key/Value pairs
    1: {
      type: "story",
      // the type of the item in the plot
      text: "On a dark and gloomy Tuesday evening, there was a loud thud that echoed throughout the barn.",
      // instruction / story to display on screen
      goto: 2,
      // key to go to after current item (as user presses "Enter" in input box)
    },
    2: {
      type: "question",
      text: "What is the gradient of y=x?",
      correct: "1",
      explanation: explainGradients,
      // Explanation displayed if user makes the wrong choice
      goto: [2.11, 4],
      //[right answer address, wrong answer address]
    },
    2.11: {
      type: "option",
      text: "Would you like to interview the suspects? [Y/N]",
      options: [
        ["Y", "You start to interview the suspects."],
        ["N", "You didn't interview the suspects."],
      ],
      goto: [2.1, 3],
    },
    2.1: {
      type: "story",
      text: "Celia was milking her two cows, Joise and Sugar, far away frm the scene f the murder, to cllect milk because her family was coming over for breakfast the next morning.",
      goto: 2.2,
    },
    2.2: {
      type: "story",
      text: "Sivana was watering the plants at the enterance of the farm.",
      goto: 2.3,
    },
    2.3: {
      type: "story",
      text: "Thao was reading on the balcony, overlooking the horses.",
      goto: 2.4,
    },
    2.4: {
      type: "story",
      text: "Sascha was in the shower, taking her sweet time with her green appte.",
      goto: 3,
    },
    3: {
      type: "vote",
      // type of item in which user's choice affects future plots
      text: "Vote Celia[A], Sivana[B], Thao[C], or Sascha[D]. Who is the murderer of Donad Duck?",
      choices: ["Celia", "Sivana", "Thao", "Sascha"],
      goto: [5, 6, 6, 6],
      // corresponding address to go to (parallel lists)
    },
    4: {
      type: "story",
      text: "You didn't get the chance to vote. Game over.",
      goto: "end",
    },
    5: {
      type: "story",
      text: "Celia is the murderer!",
      goto: "end",
    },
    6: {
      type: "story",
      text: "Oops! This is not the murderer…",
      goto: "end",
    },
    end: {
      type: "story",
      text: "Congratulations! You have completed the game!",
      goto: "0",
    },
  };
  // state hooks
  // var pointer = 1;
  const [pointer, setPointer] = useState(1);
  const [content, setContent] = useState("Press Enter to Start.");
  const [placeholder, setPlaceholder] = useState("Enter to continue…");
  const [confetti, setConfetti] = useState(false);

  // operations
  const handleKeyDown = (event) => {
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
        ["A", "B", "C", "D"].indexOf(event.key) == -1 ||
        event.target.value.length + 1 > 1
      ) {
        event.preventDefault();
      }
      // 如果是 option，那只能是指定的字母
    } else if (identifyType(pointer) == "option") {
      var options = plot[pointer].options.map((x) => x[0]).flat(2);
      if (
        options.indexOf(event.key) == -1 ||
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
    console.log("pointer is at: " + pointer);
    if (identifyType(pointer) == "story") {
      setPlaceholder("Enter to continue…");
      story(plot[pointer].text, plot[pointer].goto, e);
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
  const story = (text, goto, e) => {
    output(text);
    setPointer(goto);
    e.preventDefault();
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
        output(input + "\n\nCorrect! Great job! The plot now continues…");
        setConfetti(true);
        setPointer(goto[0]);
      } else {
        output(
          input +
            "\n\nYour answer is wrong! The correct answer is: " +
            correct +
            "\n\n" +
            explanation
        );
        setPointer(goto[1]);
      }
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

  // detail ones
  const output = (text) => {
    setContent(content + "\n\n" + text);
  };

  return (
    <div className="playGame">
      <ShowConfetti confetti={confetti} />
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
          style={{
            whiteSpace: "pre-line",
            overFlow: "scroll",
            marginBottom: 0,
          }}
        >
          <br />
          <br />
          <br />
          <b>Chapter 1</b> <br />
          <br />
          {content + "\n\n\n\n\n\n\n"}
          <span id="contentEnd"></span>
        </p>
        {/* <form onSubmit={handleSubmit}> */}
        <form>
          <input
            className="input"
            placeholder={placeholder}
            // onChange={next}
            onKeyPress={handleKeyDown}
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
