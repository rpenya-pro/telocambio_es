import React from "react";
import { Spinner } from "react-bootstrap";

export const LoaderMini = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "150px",
      }}
    >
      <div>
        <Spinner animation="border" variant="dark" />
      </div>
    </div>
  );
};
