import axios from "axios";

export const addGame = (plot) => {
  var plotString = JSON.stringify(plot);

  axios
    .post("http://localhost:8080/api/games/", {
      plot: plotString,
      name: "The Stone Island (with questions)",
      authorId: 1,
      description:
        "The Island is full of stone statues of young girls. They are the most delicate arts, yet on their faces, there are expressions of fear nad reluctance… Succumb to the pressures of the world, or stick to your dreams? The choice is up to you.",
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
