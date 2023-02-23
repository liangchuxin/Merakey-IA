export var duck = {
  1: {
    type: "story",
    text: "On a dark and gloomy Tuesday evening, there was a loud thud that echoed throughout the barn.",
    goto: 2,
  },
  2: {
    type: "question",
    text: "What is the gradient of y=x?",
    correct: "1",
    explanation: "Gradient of a linear equation is the number before “x”.",
    goto: [2.11, 2.19],
  },
  2.11: {
    type: "question",
    text: "How many eyes do human have?",
    correct: "2",
    explanation: "Gradient of a linear equation is the number before “x”.",
    goto: [2.19, 4],
  },
  2.19: {
    type: "question",
    text: "What is the name of the programmer?",
    correct: "Celia",
    explanation: "Gradient of a linear equation is the number before “x”.",
    goto: [2.12, 4],
  },
  2.12: {
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
    text: "Vote Celia[A], Sivana[B], Thao[C], or Sascha[D]. Who is the murderer of Donad Duck?",
    choices: ["Celia", "Sivana", "Thao", "Sascha"],
    goto: [5, 6, 6, 6],
  },
  4: {
    type: "story",
    text: "You didn't get the chance to vote. Game over.",
    goto: "0",
    end: "bad",
  },
  5: {
    type: "story",
    text: "Celia is the murderer!",
    goto: "end",
  },
  6: {
    type: "story",
    text: "Oops! This is not the murderer…",
    goto: "0",
    end: "bad",
  },
  end: {
    type: "story",
    text: "Congratulations! You have completed the game!",
    goto: "0",
    end: "true",
  },
};
