import React from "react";
import ReactDOM from "react-dom";
export * from "./hooks";

export default function Root(props) {
  return <section>{props.name} is mounted!</section>;
}
