import React from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function downloadPDF(Qs) {
  const downloadTxtFile = (text) => {
    const element = document.createElement("a");
    const file = new Blob([text], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "Wrong Questions.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  var wrongQs = [];
  Qs.map((questionText) => {
    if (questionText[1] == "wrong") {
      wrongQs = wrongQs.concat([questionText]);
    }
  });
  var textFile = "List of wrong questions \n\n";
  if (wrongQs.length == 0) {
    // alert("You don't have wrong answers!");
    toast("You don't have wrong answers!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      icon: "🦄",
    });
  } else {
    var index = 1;
    wrongQs.map((questionText) => {
      if (questionText[1] == "wrong") {
        textFile += `${index}. ${questionText[0]}\n\n`;
        index += 1;
      }
    });
    console.log(textFile);
    downloadTxtFile(textFile);
  }
}
export default downloadPDF;
