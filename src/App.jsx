import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

const App = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Vishal Daware",
      description: "Passionate IT Engineering student with strong skills in Front-End Web Development, including HTML, CSS, JavaScript, React JS, and Bootstrap. Proficient in building responsive, user-friendly interfaces with a keen eye for UI/UX design.",
      imgSrc: `${process.env.PUBLIC_URL}/assets/img/profile.jpg`,
      location: { lat: 37.7749, lng: -122.4194 }
    }
  ]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home cards={cards} />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin cards={cards} setCards={setCards} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
