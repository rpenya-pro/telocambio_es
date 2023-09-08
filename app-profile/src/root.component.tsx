import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorProtectedComponent } from "@app-shared/react-shared";
import { ProfilePage } from "./pages/ProfilePage";

export default function Root(props) {
  return <ProfilePage />;
}
