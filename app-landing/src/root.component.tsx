import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomeLanding } from "./pages/HomeLanding";
import { FrequentedAskQuestions } from "./pages/FrequentedAskQuestions";
import { ContactComponent } from "./pages/ContactComponent";
import { AuthProvider } from "./auth/AuthContext";

export default function Root(props) {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeLanding />}></Route>
          <Route path="/faq" element={<FrequentedAskQuestions />}></Route>
          <Route path="/contacta" element={<ContactComponent />}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
