import React, { useState, useEffect } from "react";
import DrawingBoard from "react-drawing-board";
import { v4 as uuidv4 } from "uuid";
import { socket } from "../../../services/socket";
import { useRoomClientContext } from "../../../services/RoomClientContext";
// const DrawingBoard = require("react-drawing-board");
const Drawnew = () => {
  const [operations, setOperations] = useState([]);
  const { clientId } = useRoomClientContext();
  useEffect(() => {
    socket.on("draw", ({ newOps }) => {
      setOperations((oldOps) => {
        return [...oldOps, ...newOps];
      });
    });
  }, []);
  const handleDraw = (newOp, afterOp) => {
    // emit newOp
    socket.emit("draw", newOp);
    setOperations(afterOp);
  };

  return (
    // <div>
    <DrawingBoard
      userId={clientId}
      operations={operations}
      onChange={(newOp, afterOp) => handleDraw(newOp, afterOp)}
      toolbarPlacement={"left"}
    />
    // </div>
  );
};

export default Drawnew;
