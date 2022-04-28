import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MessengerBody from "../../Components/Messenger/MessengerBody";
import MessengerSidebar from "../../Components/Messenger/MessengerSidebar";
import { io } from "socket.io-client";
import { api } from "../../Utils/Api";

export default function StudentMessenger() {
  const socket = useRef();
  const navigate = useNavigate();
  const chatId = localStorage.getItem("x-access-token");
  if (!chatId) {
    navigate("/login");
  }
  const userId = localStorage.getItem("x-access-user");
  const headers = {
    Authorization: chatId,
    userAccess: userId,
  };
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [currentTab, setCurrentTab] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messengerMode, setMessengerMode] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("x-access-token")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    async function getUsers() {
      var req = await fetch(`${api}api/chat/${userId}`, {
        method: "GET",
        headers,
      });
      var res = await req.json();
      if (req.ok) {
        setUsers(res);
      } else {
        alert("Something went wrong, couldn't fetch messages");
      }
    }
    getUsers();
  }, []);
  useEffect(() => {
    if (chatId) {
      async function getUser() {
        var req = await fetch(`${api}api/chat/user/${userId}`, {
          method: "GET",
          headers,
        });

        var res = await req.json();
        if (req.ok) {
          setUser(res);
        } else {
          alert("Something wrong while fetching user data");
        }
      }
      getUser();
    }
  }, [chatId]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  useEffect(() => {
    // if (user !== null) {
    socket.current = io(api);
    socket.current.emit("add-user", userId);
    // }
  }, []);

  return (
    <Container>
      <div
        className={`container ${messengerMode ? "light-mode" : "dark-mode"}`}
      >
        <MessengerSidebar
          users={users}
          user={user}
          changeChat={handleChatChange}
          setCurrentTab={setCurrentTab}
          messengerMode={messengerMode}
        />
        <MessengerBody
          user={user}
          setCurrentTab={setCurrentTab}
          users={users}
          currentTab={currentTab}
          currentChat={currentChat}
          socket={socket}
          messengerMode={messengerMode}
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  .dark-mode {
    background: #131324;
  }
  .light-mode {
    background: #ccc;
    color: #131324;
  }
  .container {
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 20% 80%;
  }
`;
