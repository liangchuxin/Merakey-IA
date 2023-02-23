import React, { useEffect, useState } from "react";

export function GetCover(id) {
  const [cover, setCover] = useState(null);
  fetch(`http://localhost:8080/api/games/${id}/cover`)
    .then((res) => res.json())
    .then((data) => {
      console.log("now returning " + data.coverR);
      setCover(data.coverR);
    })
    .catch((err) => {
      console.log("error: " + err);
    });
  React.useEffect(() => {
    return cover;
  });
}
