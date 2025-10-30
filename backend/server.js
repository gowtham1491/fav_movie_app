const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let movies = [
  { title: "Inception", type: "Movie", director: "Nolan", budget: "$160M", location: "LA, Paris", duration: "148 min", year: "2010" },
  { title: "Breaking Bad", type: "TV Show", director: "Gilligan", budget: "$3M/ep", location: "Albuquerque", duration: "49 min/ep", year: "2008–2013" }
];

app.get("/api/movies", (req, res) => {
  res.json(movies);
});

app.post("/api/movies", (req, res) => {
  const newMovie = req.body;
  movies.push(newMovie);
  res.json({ message: "Movie added", movies });
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
