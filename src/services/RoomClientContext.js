import React, { useState, useContext, useEffect, useMemo } from "react";

const RoomClientContext = React.createContext();

const RoomClientProvider = ({ children }) => {
  const [clientId, setClientId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [curUser, setCurUser] = useState(null);
  const [curClientInfo, setCurClientInfo] = useState({});

  const handleClientId = (value) => {
    setClientId(value);
  };

  const handleRoomId = (value) => {
    setRoomId(value);
  };

  const handleAllUsers = (value) => {
    setAllUsers(value);
  };

  const handleCurClientInfo = (value) => {
    setCurClientInfo(value);
  };

  const handleCurUser = (value) => {
    setCurUser(value);
  };

  return (
    <RoomClientContext.Provider
      value={{
        clientId,
        roomId,
        allUsers,
        curClientInfo,
        curUser,
        handleClientId,
        handleRoomId,
        handleAllUsers,
        handleCurClientInfo,
        handleCurUser,
      }}
    >
      {children}
    </RoomClientContext.Provider>
  );
};

const useRoomClientContext = () => {
  return useContext(RoomClientContext);
};

export { useRoomClientContext };

export default RoomClientProvider;
