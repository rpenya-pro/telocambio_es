// MyThreads.tsx

import React from "react";
import { Thread } from "../../../interfaces";

interface MyThreadsProps {
  threads: Thread[];
  onThreadSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MyThreads: React.FC<MyThreadsProps> = ({ threads, onThreadSelect }) => {
  return (
    <select className="form-control-global" onChange={onThreadSelect}>
      <option value="">Selecciona uno de tus Threads para intercambiar</option>
      {threads.map((thread: Thread, index: number) => (
        <option value={thread._id} key={index}>
          {thread.description}
        </option>
      ))}
    </select>
  );
};

export default MyThreads;
