import React, { useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([
    {
      title: "Inception",
      type: "Movie",
      director: "Christopher Nolan",
      budget: "$160M",
      location: "LA, Paris",
      duration: "148 min",
      year: "2010",
    },
    {
      title: "Breaking Bad",
      type: "TV Show",
      director: "Vince Gilligan",
      budget: "$3M/ep",
      location: "Albuquerque",
      duration: "49 min/ep",
      year: "2008-2013",
    },
  ]);

  const [newMovie, setNewMovie] = useState({
    title: "",
    type: "Movie",
    director: "",
    budget: "",
    location: "",
    duration: "",
    year: "",
  });

  // index of editing row (null means adding)
  const [editingIndex, setEditingIndex] = useState(null);

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prev) => ({ ...prev, [name]: value }));
  };

  // Add or Update when form submitted
  const handleSave = (e) => {
    e.preventDefault();

    // basic validation
    if (!newMovie.title.trim() || !newMovie.director.trim()) {
      alert("Please provide Title and Director.");
      return;
    }

    if (editingIndex === null) {
      // Add new
      setMovies((prev) => [...prev, newMovie]);
    } else {
      // Update existing (only the specific row)
      setMovies((prev) =>
        prev.map((m, i) => (i === editingIndex ? { ...m, ...newMovie } : m))
      );
    }

    // reset form & editing state
    setNewMovie({
      title: "",
      type: "Movie",
      director: "",
      budget: "",
      location: "",
      duration: "",
      year: "",
    });
    setEditingIndex(null);
  };

  // Delete specific movie
  const handleDelete = (index) => {
    if (!window.confirm("Delete this movie?")) return;
    setMovies((prev) => prev.filter((_, i) => i !== index));
    // if deleted row is being edited, cancel edit
    if (editingIndex === index) {
      setEditingIndex(null);
      setNewMovie({
        title: "",
        type: "Movie",
        director: "",
        budget: "",
        location: "",
        duration: "",
        year: "",
      });
    }
  };

  // Load row into form for editing
  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewMovie({ ...movies[index] });
    // scroll to form (optional)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingIndex(null);
    setNewMovie({
      title: "",
      type: "Movie",
      director: "",
      budget: "",
      location: "",
      duration: "",
      year: "",
    });
  };

  return (
    <div className="app">
      <h1>🎬 Favorite Movies & TV Shows</h1>

      <form className="form" onSubmit={handleSave}>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={newMovie.title}
          onChange={handleChange}
        />

        <select name="type" value={newMovie.type} onChange={handleChange}>
          <option value="Movie">Movie</option>
          <option value="TV Show">TV Show</option>
        </select>

        <input
          name="director"
          type="text"
          placeholder="Director"
          value={newMovie.director}
          onChange={handleChange}
        />
        <input
          name="budget"
          type="text"
          placeholder="Budget"
          value={newMovie.budget}
          onChange={handleChange}
        />
        <input
          name="location"
          type="text"
          placeholder="Location"
          value={newMovie.location}
          onChange={handleChange}
        />
        <input
          name="duration"
          type="text"
          placeholder="Duration"
          value={newMovie.duration}
          onChange={handleChange}
        />
        <input
          name="year"
          type="text"
          placeholder="Year/Time"
          value={newMovie.year}
          onChange={handleChange}
        />

        <button type="submit" className="add-btn">
          {editingIndex === null ? "➕ Add" : "💾 Update"}
        </button>

        {editingIndex !== null && (
          <button
            type="button"
            onClick={handleCancelEdit}
            style={{
              marginLeft: 8,
              background: "#6c757d",
              color: "white",
              padding: "8px 12px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="movie-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Director</th>
            <th>Budget</th>
            <th>Location</th>
            <th>Duration</th>
            <th>Year/Time</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {movies.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: 20 }}>
                No movies yet
              </td>
            </tr>
          ) : (
            movies.map((movie, index) => (
              <tr key={index}>
                <td>{movie.title}</td>
                <td>{movie.type}</td>
                <td>{movie.director}</td>
                <td>{movie.budget}</td>
                <td>{movie.location}</td>
                <td>{movie.duration}</td>
                <td>{movie.year}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(index)}
                    style={{ marginRight: 6 }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
