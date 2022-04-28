//eslint-skip-next-line
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MessageDisplay from "./MessageDisplay";
import MessageOptions from "./MessageOptions";
import MessageInput from "./MessageInput";
import { api } from "../../../Utils/Api";
import { v4 as uuidv4 } from "uuid";

export default function MessageField({
  currentChat,
  user,
  socket,
  messengerMode,
}) {
  const [currentUsername, setCurrentUsername] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivedMsg, setArrivedMsg] = useState(null);
  // const socket = useRef();

  var headers = {
    Authorization: localStorage.getItem("x-access-token"),
    userAccess: localStorage.getItem("x-access-user"),
  };

  useEffect(() => {
    if (currentChat) {
      setCurrentUsername(currentChat.username);
    }
  }, [currentChat]);

  useEffect(() => {
    const newBody = new FormData();
    newBody.append("from", user._id);
    newBody.append("to", currentChat._id);
    async function getMsg() {
      var req = await fetch(`${api}api/chat/`, {
        method: "POST",
        headers,
        body: newBody,
      });
      var res = await req.json();
      if (req.ok) {
        setMessages(res);
      } else {
        console.log("could not fetch your messages");
      }
    }
    getMsg();
  }, [currentChat]);

  const handleSendmag = async (msg) => {
    var body = new FormData();
    body.append("from", user._id);
    body.append("to", currentChat._id);
    body.append("message", msg);

    var req = await fetch(`${api}api/chat/add`, {
      method: "POST",
      headers,
      body,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: user._id,
      messages: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromUser: true, message: msg });
    setMessages(msgs);
    if (!req.ok) {
      alert("couldn't send message");
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("receive-msg", (msg) => {
        setArrivedMsg({
          fromUser: false,
          message: msg,
        });
      });
    }
  }, []);

  useEffect(() => {
    arrivedMsg && setMessages((prev) => [...prev, arrivedMsg]);
  }, [arrivedMsg]);

  return (
    <Wrapper>
      <MessageOptions currentUsername={currentUsername} />
      <MessageDisplay
        messages={messages}
        uuidv4={uuidv4}
        currentChat={currentChat}
        messengerMode={messengerMode}
        setMessages={setMessages}
        user={user}
      />
      <MessageInput handleSendMsg={handleSendmag} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 87vh;
  display: grid;
  grid-template-rows: 10% 75% 15%;
  position: sticky;
  left: 0;
  overflow: hidden;
  top: 0;
`;
