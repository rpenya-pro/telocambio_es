import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

export const LoadingComponent = () => {
  const { isLoading } = useAuth();
  const [progress, setProgress] = useState(0);
  //const isLoading = true;
  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="progress-floating">
      <ProgressBar className="custom-progress-container">
        <ProgressBar now={progress} className="custom-progress-bar" />
      </ProgressBar>
    </div>
  );
};
