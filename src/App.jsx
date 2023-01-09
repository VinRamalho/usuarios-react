import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import ListUsers from "./pages/ListUsers/ListUsers";
import StatusCat from "./pages/StatusCat/StatusCat";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ListUsers />} />
        <Route exact path="/status-cat" element={<StatusCat />} />
      </Routes>
    </Router>
  );
};

export default App;
